const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const pool = require("../config/database");
const { sendOTP } = require("../config/email");
const { generateOTP, isValidCampusEmail } = require("../utils/helper");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Rate limiting for OTP requests
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6, // Limit each IP to 6 OTP requests per windowMs
  message: "Too many OTP requests, please try again later.",
});

// ✅ Send OTP
router.post("/send-otp", otpLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    if (!isValidCampusEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please use a valid campus email address",
      });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in DB
    const query = `
      INSERT INTO email_verifications (email, otp, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) 
      DO UPDATE SET otp = $2, expires_at = $3, verified = false
    `;
    await pool.query(query, [email, otp, expiresAt]);

    // Send OTP via email
    const emailSent = await sendOTP(email, otp);
    if (emailSent) {
      return res.json({
        success: true,
        message: "OTP sent to your campus email",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP. Please try again.",
      });
    }
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ✅ Verify OTP (Register + Login combined)
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, firstName, lastName, isNewUser } = req.body;

    // Check OTP
    const otpQuery = `
      SELECT * FROM email_verifications 
      WHERE email = $1 AND otp = $2 AND expires_at > NOW() AND verified = false
    `;
    const otpResult = await pool.query(otpQuery, [email, otp]);
    if (otpResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Mark OTP as used
    await pool.query(
      "UPDATE email_verifications SET verified = true WHERE email = $1",
      [email]
    );

    let user;

    if (isNewUser) {
      // Check if user already exists (avoid duplicate email error)
      const existingUser = await pool.query(
        "SELECT id, email, first_name, last_name, campus_verified, profile_complete FROM users WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length > 0) {
        user = existingUser.rows[0];
      } else {
        // Register new user
        const userQuery = `
          INSERT INTO users (email, first_name, last_name, campus_verified)
          VALUES ($1, $2, $3, true)
          RETURNING id, email, first_name, last_name, campus_verified, profile_complete
        `;
        const userResult = await pool.query(userQuery, [email, firstName, lastName]);
        user = userResult.rows[0];

        // Create empty profile
        await pool.query("INSERT INTO user_profiles (user_id) VALUES ($1)", [user.id]);
      }
    } else {
      // Login existing user
      const userQuery = `
        SELECT id, email, first_name, last_name, campus_verified, profile_complete
        FROM users WHERE email = $1
      `;
      const userResult = await pool.query(userQuery, [email]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found. Please register first.",
        });
      }
      user = userResult.rows[0];
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: isNewUser ? "Account created successfully" : "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        campusVerified: user.campus_verified,
        profileComplete: user.profile_complete,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ✅ Current user (requires Authorization: Bearer <token>)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    // Query names to ensure first/last name are present even if middleware doesn't include them
    const result = await pool.query(
      "SELECT id, email, first_name, last_name, campus_verified, profile_complete FROM users WHERE id = $1",
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const row = result.rows[0];
    return res.json({
      success: true,
      user: {
        id: row.id,
        email: row.email,
        firstName: row.first_name,
        lastName: row.last_name,
        campusVerified: row.campus_verified,
        profileComplete: row.profile_complete,
      },
    });
  } catch (error) {
    console.error("Me endpoint error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
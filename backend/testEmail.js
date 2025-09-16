// backend/testEmail.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendTestEmail() {
  try {
    let info = await transporter.sendMail({
      from: `"Skill Swap Test" <${process.env.EMAIL_USER}>`,
      to: chinnum2005@gmail.com, // send email to yourself first
      subject: "Test Email from Skill Swap",
      text: "If you see this, Outlook SMTP works!",
    });

    console.log("✅ Test email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending test email:", error);
  }
}

sendTestEmail();

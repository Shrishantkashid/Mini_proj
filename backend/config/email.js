const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send OTP
const sendOTP = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Skill Swap Platform" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your OTP Code - Skill Swap',
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP is: <b>${otp}</b></p><p>It will expire in 10 minutes.</p>`
    });

    console.log('OTP email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false;
  }
};

module.exports = { sendOTP };
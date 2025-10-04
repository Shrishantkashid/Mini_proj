const nodemailer = require('nodemailer');

// Build transporter from env. Supports either well-known service or custom host/port.
const createTransporter = () => {
  const {
    EMAIL_SERVICE,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_USER,
    EMAIL_PASS
  } = process.env;

  // Use Gmail service by default if user has Gmail account
  const useGmailService = EMAIL_SERVICE === 'gmail' || (!EMAIL_SERVICE && EMAIL_USER && EMAIL_USER.includes('@gmail.com'));

  if (useGmailService) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });
  }

  if (EMAIL_SERVICE) {
    return nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST || 'smtp.gmail.com',
    port: EMAIL_PORT ? Number(EMAIL_PORT) : 587,
    secure: EMAIL_SECURE ? EMAIL_SECURE === 'true' : false,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
  });
};

const transporter = createTransporter();

// Function to send OTP
const sendOTP = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"BlockLearn Platform" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your OTP Code - BlockLearn',
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
// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Validate campus email
const isValidCampusEmail = (email) => {
  const campusDomains = ['@saividya.ac.in'];
  return campusDomains.some(domain => email.toLowerCase().endsWith(domain.toLowerCase()));
};

module.exports = {
  generateOTP,
  isValidCampusEmail
};

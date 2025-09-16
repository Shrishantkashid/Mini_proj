import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [step, setStep] = useState("enterDetails"); // enterDetails → otp
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    try {
      await axios.post("/api/auth/send-otp", {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        isNewUser: true,
      });
      setStep("otp");
      setMessage("OTP sent to your email!");
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || error.message || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("/api/auth/verify-otp", {
        email: formData.email,
        otp,
        isNewUser: true,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      setMessage(`✅ Registered & Logged in! Token: ${res.data.token}`);
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || error.message || "Error verifying OTP");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {step === "enterDetails" ? (
        <>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={formData.email}
            onChange={handleChange}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify & Register</button>
        </>
      )}
      <p>{message}</p>
    </div>
  );
};

export default Register;

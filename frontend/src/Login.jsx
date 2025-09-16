import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [step, setStep] = useState("enterEmail"); // enterEmail → otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      await axios.post("/api/auth/send-otp", {
        email,
        isNewUser: false,
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
        email,
        otp,
        isNewUser: false,
      });
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Logged in!");
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || error.message || "Error verifying OTP");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {step === "enterEmail" ? (
        <>
          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button onClick={verifyOtp}>Verify & Login</button>
        </>
      )}
      <p>{message}</p>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [step, setStep] = useState("enterEmail"); // enterEmail → otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      await axios.post("/api/auth/send-otp", {
        email,
        isNewUser: false,
      });
      setStep("otp");
      setMessage("OTP sent to your email! Check your inbox.");
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || error.message || "Error sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await axios.post("/api/auth/verify-otp", {
        email,
        otp,
        isNewUser: false,
      });
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || error.response?.data?.error || error.message || "Error verifying OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setStep("enterEmail");
    setMessage("");
    setOtp("");
  };

  return (
    <div className="min-h-screen app-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="text-3xl font-bold gradient-text mb-2 block">
            SkillSwap
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">
            {step === "enterEmail" ? "Welcome Back" : "Verify Your Email"}
          </h2>
          <p className="text-gray-600 mt-2">
            {step === "enterEmail" 
              ? "Enter your campus email to continue" 
              : "We've sent a verification code to your email"
            }
          </p>
        </div>

        {/* Form */}
        <div className="card">
          {step === "enterEmail" ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Campus Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@campus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  onKeyPress={(e) => e.key === 'Enter' && sendOtp()}
                />
              </div>
              
              <button
                onClick={sendOtp}
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="input-field text-center text-2xl tracking-widest"
                  maxLength="6"
                  onKeyPress={(e) => e.key === 'Enter' && verifyOtp()}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Code sent to: <span className="font-medium">{email}</span>
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={goBack}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={verifyOtp}
                  disabled={isLoading}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    "Verify & Login"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg ${
              message.includes("✅") || message.includes("sent") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              <div className="flex items-center">
                {message.includes("✅") ? (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : message.includes("sent") ? (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="text-sm font-medium">{message}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign up here
            </Link>
          </p>
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm mt-4 block">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
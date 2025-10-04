import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendOTP, verifyOTP } from "../api";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Sparkles, ArrowLeft, Mail, User, CheckCircle, AlertCircle } from "lucide-react";

function Signup() {
  const [step, setStep] = useState("enterDetails"); // enterDetails -> enterOtp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setMessage("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await sendOTP(email, true);
      if (res.success) {
        setStep("enterOtp");
        setMessage(`✅ ${res.message}`);
      } else {
        setMessage(res.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage("Please enter the OTP");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await verifyOTP(email, otp, firstName, lastName, true);
      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userData", JSON.stringify(res.user));
        setMessage("✅ Account created successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage(res.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth signup handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/auth/google", { 
        credential: credentialResponse.credential,
        isNewUser: true
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      setMessage("✅ Account created successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Google signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setMessage("Google signup failed. Please try again.");
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground 
        type="blobs" 
        intensity={0.6}
        disableOnMobile={true}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              <Sparkles className="w-10 h-10 text-primary" />
              <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SkillSwap
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h2>
            <p className="text-muted-foreground">
              Join the SkillSwap community today
            </p>
          </div>

          {/* Form Card */}
          <div 
            className="backdrop-blur-md bg-card/50 border border-border/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Gradient Blob Effect */}
            <div
              className={`absolute pointer-events-none w-[400px] h-[400px] bg-gradient-hero opacity-20 rounded-full blur-3xl transition-opacity duration-200 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `translate(${mousePosition.x - 200}px, ${mousePosition.y - 200}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            />

            <div className="relative z-10">
              {/* Google Sign In */}
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
                theme="outline"
                size="large"
                text="signup_with"
                shape="rectangular"
                width="100%"
                className="w-full"
              />

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-xs text-muted-foreground">or sign up with email</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

          {step === "enterDetails" ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-card/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-card/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your email address
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-4 rounded-xl bg-primary text-primary-foreground border border-primary/20 shadow-lg hover:bg-primary/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                  "Send OTP"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-foreground mb-2 text-center">
                  Enter OTP Code
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-4 bg-card/50 border border-border rounded-xl text-foreground text-center text-2xl tracking-[0.5em] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm font-mono"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-gray-400 mt-2 text-center">
                  OTP sent to <span className="text-primary">{email}</span>
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("enterDetails")}
                  className="flex-1 px-6 py-3 rounded-xl bg-card/50 text-foreground border border-border backdrop-blur-sm hover:bg-card transition-all font-medium flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground border border-primary/20 shadow-lg hover:bg-primary/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                    "Verify & Create Account"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-4 rounded-xl backdrop-blur-sm ${
              message.includes("✅") 
                ? "bg-primary/20 text-foreground border border-primary/30" 
                : "bg-destructive/20 text-foreground border border-destructive/30"
            }`}>
              <div className="flex items-center">
                {message.includes("✅") ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                <span className="text-sm font-medium">{message}</span>
              </div>
            </div>
          )}
            </div>
          </div>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign in here
            </Link>
          </p>
          <Link to="/" className="text-muted-foreground hover:text-foreground text-sm flex items-center justify-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Signup;

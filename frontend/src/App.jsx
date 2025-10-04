import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Skills from "./pages/Skills.jsx";
import Match from "./pages/Match.jsx";
import Sessions from "./pages/Sessions.jsx";
import Signup from "./pages/Signup.jsx";
import DemoGlowingEffect from "./pages/DemoGlowingEffect.jsx";
import Demo3DHero from "./pages/Demo3DHero.tsx";
import DemoBeams from "./pages/DemoBeams.tsx";
import DemoLoginModern from "./pages/DemoLoginModern.tsx";
import Settings from "./pages/Settings.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import SetPassword from "./pages/SetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/match" element={<Match />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/demo-glow" element={<DemoGlowingEffect />} />
        <Route path="/demo-3d" element={<Demo3DHero />} />
        <Route path="/demo-beams" element={<DemoBeams />} />
        <Route path="/demo-login" element={<DemoLoginModern />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}
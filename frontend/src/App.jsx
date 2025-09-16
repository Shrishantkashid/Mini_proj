import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
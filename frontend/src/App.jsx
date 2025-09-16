import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <div>
      <h1>Skill Swap Platform</h1>
      <Routes>
        <Route path="/" element={<><Register /><Login /></>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
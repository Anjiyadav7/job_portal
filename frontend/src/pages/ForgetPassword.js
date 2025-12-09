// src/pages/ForgetPassword.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");

    try {
      await axios.post("http://localhost:8000/api/password_reset/", {
        email,
      });
      setStatus("Reset instructions sent to your email.");
      setEmail("");
    } catch (err) {
      setError("Failed to send reset email. Check email or try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900 px-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md border border-white/20 text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Send Reset Link
          </button>
        </form>

        {status && <p className="text-green-400 mt-4 text-sm">{status}</p>}
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}

        <p className="text-sm text-center text-white/70 mt-6">
          Back to{" "}
          <Link to="/login" className="text-blue-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;

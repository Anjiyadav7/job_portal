import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/background.jpg')`, // Change this to your image path or URL
      }}
    >
      <div className="flex w-full h-full min-h-screen bg-black bg-opacity-50">
        {/* LEFT: Video Frame */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="w-[500px] h-[500px] rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/9Xw8XzV3ZO8?autoplay=1&mute=1&loop=1&playlist=9Xw8XzV3ZO8"
              title="YouTube video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* RIGHT: Login Form */}
        <div className="w-1/2 bg-gradient-to-br from-gray-200 via-gray-100 to-yellow-100 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-md text-black p-8 rounded-xl border border-white/20 shadow-2xl z-10">
            {/* Decorative Heading with SVG behind */}
            <div className="relative flex justify-center mb-6">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 300 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10 70 C 50 10, 250 10, 290 70"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.15"
                />
                <path
                  d="M20 65 C 60 20, 240 20, 280 65"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.1"
                />
                <line
                  x1="50"
                  y1="10"
                  x2="250"
                  y2="10"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  opacity="0.1"
                />
              </svg>

              <h1 className="relative text-5xl font-bold tracking-wide font-[Pacifico] text-black drop-shadow-xl z-10">
                JobPortal
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-white/80 border border-gray-300 text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/80 border border-gray-300 text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                Log In
              </button>
            </form>

            <p className="text-sm text-center text-blue-800 hover:underline mt-4">
              <Link to="/forgot-password">Forgot your password?</Link>
            </p>

            <p className="text-sm text-center text-gray-700 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white text-center text-gray-600 text-sm py-3 border-t mt-4">
        <p>
          Terms of Service | Privacy Policy | © 2025 JobPortal. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;

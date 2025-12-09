import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PhoneCarousel = () => {
  const image = "https://www.shutterstock.com/image-vector/registration-3d-icon-symbol-password-600nw-2143032151.jpg";

  return (
    <div className="relative w-[300px] h-[550px]">
      <img
        src="https://png.pngtree.com/png-clipart/20230929/original/pngtree-3d-character-illustration-man-holding-a-laptop-and-smiling-png-image_13173040.png"
        alt="Phone"
        className="absolute top-0 left-0 w-full h-full z-10 object-contain"
      />
      <img
        src={image}
        alt="Person Registering"
        className="absolute top-4 left-4 w-[270px] h-[510px] rounded-xl object-cover z-0"
      />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        setError(data.detail || JSON.stringify(data));
      }
    } catch (err) {
      setError('Registration failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative overflow-hidden p-6">
      <div className="absolute inset-0 -z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#0f2027" />
              <stop offset="50%" stopColor="#203a43" />
              <stop offset="100%" stopColor="#2c5364" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#bg)" />
          <circle cx="600" cy="100" r="250" fill="#ffffff11" />
          <circle cx="200" cy="500" r="300" fill="#ffffff08" />
        </svg>
      </div>

      <div className="hidden lg:flex items-center justify-center mr-10 z-10">
        <PhoneCarousel />
      </div>

      <div className="z-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30 text-white">
        <h1 className="text-5xl font-pacifico text-center mb-8 drop-shadow-md tracking-wide text-white">
          JobPortal
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/30 text-white px-4 py-2 rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/30 text-white px-4 py-2 rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/30 text-white px-4 py-2 rounded-lg placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <div className="text-red-300 text-sm font-medium">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-center text-white/70 mt-6">
          Already have an account?{' '}
          <Link to="/" className="text-blue-300 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Briefcase,
  List,
  Search,
  Globe,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const gridMenuItems = [
    {
      label: "Upload Resume",
      icon: <Upload className="w-6 h-6" />,
      bg: "from-blue-500 to-blue-600",
      path: "/upload",
    },
    {
      label: "View Resumes",
      icon: <FileText className="w-6 h-6" />,
      bg: "from-green-500 to-green-600",
      path: "/resumes",
    },
    {
      label: "Post Job",
      icon: <Briefcase className="w-6 h-6" />,
      bg: "from-purple-500 to-purple-600",
      path: "/post-job",
    },
    {
      label: "View Jobs",
      icon: <List className="w-6 h-6" />,
      bg: "from-yellow-400 to-yellow-500",
      path: "/jobs",
    },
    {
      label: "Match Resume to All Jobs",
      icon: <Search className="w-6 h-6" />,
      bg: "from-pink-500 to-pink-600",
      path: "/match-resume",
    },
    {
      label: "Match Resume to Online Jobs",
      icon: <Globe className="w-6 h-6" />,
      bg: "from-orange-500 to-orange-600",
      path: "/match-online-jobs",
    },
  ];

  // Contact form submit handler
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // For demo, just reset and show a success message
    setContactStatus("Thank you for contacting us! We'll get back to you shortly.");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 relative overflow-hidden px-4 py-10">
      {/* Background Blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Branding & Theme Toggle */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-4">
        <button
          onClick={() => navigate("/home")}
          className="text-2xl font-bold text-indigo-600 dark:text-white tracking-wide hover:text-indigo-800 transition"
        >
          JobPortal
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>
      </div>

      {/* Top Navigation */}
      <div className="absolute top-6 right-6 flex gap-4 z-20">
        <button
          onClick={() => navigate("/profile")}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow hover:shadow-xl transition"
        >
          <User className="w-5 h-5" /> My Profile
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow hover:shadow-xl transition"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mt-20">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          🚀 Welcome to the Resume-Job Match Portal
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
          This AI-powered platform analyzes and compares resumes with job
          descriptions to show how well they match — in percentage.
        </p>
        <p className="text-md text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Whether you're a job seeker aiming to optimize your resume or a
          recruiter filtering the best candidates, our intelligent system uses
          keyword analysis, skill extraction, and natural language processing to
          give you real-time match results.
        </p>

        {/* How It Works */}
        <div className="text-gray-800 dark:text-white font-medium mb-12 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <p className="mb-2">
            🔹 <strong>Step 1:</strong> Upload your resume (PDF or DOCX).
          </p>
          <p className="mb-2">
            🔹 <strong>Step 2:</strong> Choose a job description (or select
            online jobs).
          </p>
          <p className="mb-2">
            🔹 <strong>Step 3:</strong> See your match score instantly (e.g.,
            78%).
          </p>
          <p>
            🔹 <strong>Step 4:</strong> Edit, optimize, or apply directly from
            the portal.
          </p>
        </div>

        {/* Grid Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`bg-gradient-to-r ${item.bg} text-white p-5 rounded-2xl shadow-xl flex flex-col items-center justify-center transition duration-300 transform hover:scale-105 hover:shadow-2xl`}
            >
              <div className="mb-2">{item.icon}</div>
              <span className="text-md font-semibold text-center">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 text-left max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            💡 Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 text-base">
            <li>Advanced AI/NLP-driven resume and job comparison.</li>
            <li>Clean dashboard with real-time match scores.</li>
            <li>Supports both job seekers and employers.</li>
            <li>Track your applications and get insights.</li>
            <li>Secure, fast, and completely free to use.</li>
          </ul>
        </div>

        {/* Features at a Glance */}
        <div className="mt-12 text-left max-w-4xl mx-auto bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            🔍 Features at a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <div>✅ Resume Upload & Preview</div>
            <div>✅ Job Posting & Management</div>
            <div>✅ Resume-JD Match % Score</div>
            <div>✅ Online Job Fetching</div>
            <div>✅ Candidate Filtering</div>
            <div>✅ Personalized Profile Page</div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            Contact Us
          </h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              className="w-full bg-white/90 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
              className="w-full bg-white/90 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <textarea
              placeholder="Your Message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              required
              rows={4}
              className="w-full bg-white/90 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Send Message
            </button>
          </form>
          {contactStatus && (
            <p className="mt-4 text-green-600 font-semibold text-center">
              {contactStatus}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          🌟 "Your skills. Our AI. The perfect match starts here." 🌟
          <br />
          💬 For support, contact us at{" "}
          <a
            href="mailto:support@jobmatcher.com"
            className="text-blue-500 underline"
          >
            support@jobmatcher.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

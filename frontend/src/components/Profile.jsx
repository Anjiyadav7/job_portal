// src/components/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="p-6 w-full max-w-md bg-white shadow-2xl rounded-2xl transform transition-all duration-500 hover:scale-105 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">👤 My Profile</h2>

        {loading ? (
          <div className="space-y-4">
            <Skeleton height={30} width={`80%`} />
            <Skeleton height={20} count={3} />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            <div className="space-y-4 text-gray-700 text-lg">
              <p><strong>ID:</strong> {profile.id}</p>
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
            </div>

            <div className="flex justify-between mt-6 space-x-4">
              <button
                onClick={handleEdit}
                className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-xl transition duration-300"
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleLogout}
                className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition duration-300"
              >
                🚪 Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

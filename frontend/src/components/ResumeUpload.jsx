import React, { useState } from 'react';
import API from '../api/api';
import { UploadCloud } from 'lucide-react';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a resume to upload.");
      return;
    }

    try {
      setError('');
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await API.post('resumes/upload/', formData);
      setSkills(res.data.skills || []);
    } catch (err) {
      setError("❌ Failed to upload resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUpload();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/your-image.jpg')`, // 🖼 Replace with your image path or URL
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-60 z-0" />

      {/* Card content */}
      <div className="relative z-10 p-6 rounded-xl w-[95%] max-w-md shadow-xl border border-gray-300 bg-white/90 backdrop-blur">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">📤 Upload Resume</h1>

        <form onKeyDown={handleKeyDown}>
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Choose PDF/DOCX File:</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileName(e.target.files[0]?.name || '');
                setSkills([]);
                setError('');
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {fileName && (
              <p className="text-sm text-gray-600 mt-1">
                📎 File: <span className="font-medium">{fileName}</span>
              </p>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleUpload}
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-5 py-2.5
                font-bold text-white rounded-md transition duration-300
                bg-black border-2 border-gray-400
                hover:shadow-[0_0_12px_silver] hover:scale-105
                ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <UploadCloud className="w-5 h-5" />
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-red-500 text-sm text-center">{error}</p>
          )}

          {skills.length > 0 && (
            <div className="mt-5">
              <h2 className="text-base font-semibold text-gray-800 mb-2">✅ Skills Extracted:</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResumeUpload;

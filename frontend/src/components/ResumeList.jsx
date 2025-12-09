import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileText, Download } from "lucide-react";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/resumes/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          📂 Your Uploaded Resumes
        </h2>

        {resumes.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            😕 No resumes uploaded yet. Upload one to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white/60 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg p-5 transition hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {resume.file_name || resume.file.split("/").pop()}
                  </h3>
                </div>

                <a
                  href={resume.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shadow-md"
                >
                  <Download className="w-4 h-4" />
                  View / Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeList;

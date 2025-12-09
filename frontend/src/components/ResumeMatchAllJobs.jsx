// src/components/ResumeMatchAllJobs.js
import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ResumeMatchAllJobs = () => {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResumeName, setSelectedResumeName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await API.get('resumes/');
        setResumes(data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, []);

  const handleMatchAll = async () => {
    if (!resumeId) return;

    try {
      setLoading(true);
      setResults([]);

      const selected = resumes.find((r) => r.id.toString() === resumeId);
      setSelectedResumeName(selected?.resume_name ?? `Resume ${resumeId}`);

      const { data } = await API.get(`resumes/${resumeId}/match_jobs/`);
      setResults(data?.results ?? []);
    } catch (error) {
      console.error('Matching failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
      {/* Glowing Circles */}
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-pink-500 opacity-30 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-4rem] right-[-4rem] w-80 h-80 bg-yellow-400 opacity-20 blur-[100px] rounded-full animate-ping" />
      <div className="absolute top-[30%] left-[40%] w-60 h-60 bg-blue-500 opacity-10 blur-[100px] rounded-full animate-spin-slow" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/10 border border-gray-700 backdrop-blur-2xl p-10 max-w-5xl w-full rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-yellow-300 tracking-tight drop-shadow-sm">
          🔎 AI Resume Matcher
        </h2>

        {/* Resume Selector */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <select
            aria-label="Select Resume"
            onChange={(e) => setResumeId(e.target.value)}
            value={resumeId}
            className="w-full md:w-auto border border-gray-600 bg-black text-white px-4 py-2 rounded-lg text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">-- Select Resume --</option>
            {resumes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.resume_name}
              </option>
            ))}
          </select>

          <button
            onClick={handleMatchAll}
            disabled={!resumeId || loading}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
              resumeId
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:scale-105'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Matching...
              </>
            ) : (
              'Match Jobs'
            )}
          </button>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-center text-white">
                🎯 Matching Jobs for{' '}
                <span className="text-yellow-300">{selectedResumeName}</span>
              </h3>

              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                {results.map((job, index) => (
                  <motion.div
                    key={job.job_id || index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 border border-gray-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300"
                  >
                    <h4 className="text-lg font-bold mb-2 text-black-300">
                      {job.job_title}
                    </h4>
                    <p className="mb-4 text-sm">
                      <span className="font-semibold text-yellow-200">
                        Match Score:
                      </span>{' '}
                      {job.match_score ?? 0}%
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.matched_skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-yellow-100 text-yellow-900 text-xs px-3 py-1 rounded-full font-medium shadow"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResumeMatchAllJobs;

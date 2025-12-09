import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const MatchOnlineJobs = () => {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [query, setQuery] = useState('developer');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get('resumes/');
        setResumes(res.data);
      } catch (err) {
        console.error('Failed to fetch resumes', err);
      }
    };
    fetchResumes();
  }, []);

  const handleMatch = async () => {
    if (!resumeId) return;
    setLoading(true);
    try {
      const res = await API.post('match-online-jobs/', {
        resume_id: resumeId,
        query,
      });
      setResults(res.data.results || []);
    } catch (err) {
      console.error('Error matching online jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
      {/* Glowing Decorations */}
      <div className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-pink-500 opacity-30 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-4rem] right-[-4rem] w-80 h-80 bg-yellow-400 opacity-20 blur-[100px] rounded-full animate-ping" />
      <div className="absolute top-[30%] left-[40%] w-60 h-60 bg-blue-500 opacity-10 blur-[100px] rounded-full animate-spin-slow" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/10 border border-gray-700 backdrop-blur-2xl p-8 md:p-10 max-w-4xl w-full rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-300">
          🌐 Match Resume with Online Jobs
        </h2>

        {/* Form Section */}
        <div className="space-y-4 mb-10">
          <div>
            <label className="text-white font-medium block mb-1">Select Resume</label>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded-lg shadow focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">-- Choose Resume --</option>
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.filename || resume.file?.split('/').pop()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-white font-medium block mb-1">Job Title / Query</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Python Developer"
              className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded-lg shadow focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            onClick={handleMatch}
            disabled={!resumeId || loading}
            className={`w-full md:w-auto px-6 py-2 font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
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

        {/* Results */}
        <AnimatePresence>
          {!loading && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">
                🎯 Matching Jobs for: <span className="text-yellow-300">{query}</span>
              </h3>

              <div className="space-y-6">
                {results.map((job, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/10 border border-gray-600 text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300"
                  >
                    <h4 className="text-lg font-bold text-yellow-300">{job.job_title}</h4>
                    <p className="text-sm text-yellow-100 mb-1">{job.company}</p>
                    <p className="text-sm mb-1">
                      <span className="font-semibold text-yellow-200">Score:</span> {job.score}%
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-semibold text-yellow-200">Matched:</span>{' '}
                      {job.matched_keywords.join(', ')}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold text-yellow-200">Missing:</span>{' '}
                      {job.missing_keywords.join(', ')}
                    </p>
                    <a
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-blue-300 underline hover:text-blue-400 mt-2 text-sm"
                    >
                      Apply Now
                    </a>
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

export default MatchOnlineJobs;

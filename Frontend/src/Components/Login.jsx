import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../Utils/IsTokenValid";

// Add to your imports at the top of the file
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid()) navigate("/dashboard");
  }, [navigate]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (message || error) {
      setMessage("");
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/auth/login", formData, {
        withCredentials: true,
      });
      setMessage("Access granted. Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          {/* Neon Accent Header */}
          <div className="relative p-6 bg-gradient-to-r from-black to-gray-900 border-b border-orange-400/30">
            <div className="absolute inset-0 bg-orange-500/10 blur-md"></div>
            <h2 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-300 tracking-tight">
              ADMIN PORTAL
            </h2>
          </div>

          {/* Form Container */}
          <div className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Floating Label Inputs */}
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="peer w-full px-4 py-3 bg-black/30 text-white border-b border-gray-600 focus:border-orange-400 outline-none transition-all duration-300 placeholder-transparent"
                  placeholder=" "
                />
                <label className="absolute left-0 -top-3.5 text-orange-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-orange-300 peer-focus:text-sm">
                  Email Address
                </label>
              </div>

              <div className="relative pt-2">
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="peer w-full px-4 py-3 bg-black/30 text-white border-b border-gray-600 focus:border-orange-400 outline-none transition-all duration-300 placeholder-transparent"
                  placeholder=" "
                />
                <label className="absolute left-0 -top-3.5 text-orange-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-orange-300 peer-focus:text-sm">
                  Password
                </label>
              </div>

              {/* Animated Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-medium text-white relative overflow-hidden ${
                  isLoading
                    ? "bg-orange-600/70"
                    : "bg-gradient-to-r from-orange-500 to-amber-600"
                }`}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">ACCESS SYSTEM</span>
                    {isHovered && (
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </>
                )}
              </motion.button>
            </form>

            {/* Status Messages */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-green-900/30 text-emerald-300 text-sm rounded-lg border border-emerald-800/50"
                >
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {message}
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-red-900/30 text-rose-300 text-sm rounded-lg border border-rose-800/50"
                >
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Subtle Footer */}
        <div className="mt-6 text-center text-gray-400 text-xs">
          Secure authentication portal • v2.4.1
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

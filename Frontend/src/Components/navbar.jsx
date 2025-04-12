import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if current route should hide navbar
  const isHiddenRoute =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/dashboard");

  const elements = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Reviews", path: "#reviews" },
    { name: "Contact Us", path: "#contact" },
  ];

  // Check auth status
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/verify", {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.valid);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoggedIn(false);
      setIsMobileMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) return null;

  return (
    <AnimatePresence>
      {!isHiddenRoute && (
        <motion.div
          className="overflow-x-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Regular Navbar */}
          <div className="w-full bg-black">
            <div className="px-[20px] md:px-[111px] py-[20px] md:py-[25px] font-inknut flex justify-between items-center">
              {/* Logo */}
              <Link
                to="/"
                className="text-[24px] sm:text-[36px] font-bold text-[#FFA13B] hover:scale-105 transition-transform duration-200"
              >
                UltraFitness
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-[45px]">
                {elements.map((element, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      to={element.path}
                      className="text-[22px] text-white hover:text-[#FFA13B] transition-colors duration-200 relative"
                    >
                      {element.name}
                      <motion.span
                        className="absolute left-0 bottom-0 h-[2px] bg-[#FFA13B]"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </Link>
                  </motion.div>
                ))}

                {/* Desktop Logout Button (only when logged in) */}
                {isLoggedIn && (
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center text-[22px] text-white hover:text-[#FFA13B] transition-colors duration-200 relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    Logout
                    <motion.span
                      className="absolute left-0 bottom-0 h-[2px] bg-[#FFA13B]"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.button>
                )}
              </div>

              {/* Mobile Hamburger Icon */}
              <motion.div
                className="md:hidden z-50"
                onClick={toggleMobileMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="flex flex-col justify-center items-center space-y-2 cursor-pointer">
                  <motion.div
                    className="w-6 h-1 bg-white"
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 7 : 0,
                    }}
                  />
                  <motion.div
                    className="w-6 h-1 bg-white"
                    animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  />
                  <motion.div
                    className="w-6 h-1 bg-white"
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -7 : 0,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a120a] to-[#332211] opacity-95"></div>

                {/* Close Button */}
                <motion.button
                  onClick={toggleMobileMenu}
                  className="absolute top-6 right-6 text-white z-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </motion.button>

                {/* Menu Content */}
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="relative flex flex-col items-center justify-center h-full px-6"
                >
                  {/* Logo in Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                  >
                    <Link
                      to="/"
                      className="text-[32px] font-bold text-[#FFA13B] hover:scale-105 transition-transform duration-200"
                      onClick={toggleMobileMenu}
                    >
                      UltraFitness
                    </Link>
                  </motion.div>

                  {/* Menu Items */}
                  <div className="w-full max-w-md space-y-8">
                    {elements.map((element, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="overflow-hidden"
                      >
                        <Link
                          to={element.path}
                          className="relative block text-center py-4 text-2xl font-medium text-white hover:text-[#FFA13B] transition-all"
                          onClick={toggleMobileMenu}
                        >
                          {element.name}
                          <motion.span
                            className="absolute left-1/2 bottom-3 h-[2px] bg-[#FFA13B]"
                            initial={{ width: 0, x: "-50%" }}
                            whileHover={{ width: "80%", x: "-50%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </Link>
                      </motion.div>
                    ))}

                    {/* Mobile Logout Button (only when logged in) */}
                    {isLoggedIn && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="overflow-hidden"
                      >
                        <button
                          onClick={() => {
                            handleLogout();
                            toggleMobileMenu();
                          }}
                          className="relative flex items-center justify-center w-full py-4 text-2xl font-medium text-white hover:text-[#FFA13B] transition-all"
                        >
                          <FaSignOutAlt className="mr-2" />
                          Logout
                          <motion.span
                            className="absolute left-1/2 bottom-3 h-[2px] bg-[#FFA13B]"
                            initial={{ width: 0, x: "-50%" }}
                            whileHover={{ width: "80%", x: "-50%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Social Icons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex space-x-6 mt-16"
                  >
                    {[
                      {
                        icon: <FaFacebook className="w-8 h-8" />,
                        color: "#3b5998",
                      },
                      {
                        icon: <FaInstagram className="w-8 h-8" />,
                        color: "#E1306C",
                      },
                      {
                        icon: <FaTwitter className="w-8 h-8" />,
                        color: "#1DA1F2",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="text-white hover:text-[#FFA13B] transition-colors"
                        whileHover={{
                          scale: 1.2,
                          color: "#FFA13B",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Navbar;

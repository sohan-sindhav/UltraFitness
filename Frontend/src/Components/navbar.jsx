import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const elements = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Reviews", path: "#reviews" },
    { name: "Contact Us", path: "#contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Regular Navbar */}
      <div className="w-full bg-black">
        <div className="px-[20px] md:px-[111px] py-[20px] md:py-[25px] font-inknut flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-[24px] sm:text-[36px] font-bold text-[#FFA13B]"
          >
            UltraFitness
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-[45px]">
            {elements.map((element, index) => (
              <Link
                key={index}
                to={element.path}
                className="text-[22px] text-white hover:text-[#FFA13B] hover:cursor-pointer transition-all list-none"
              >
                {element.name}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Icon - Only shows when menu is closed */}
          {!isMobileMenuOpen && (
            <div className="md:hidden z-50" onClick={toggleMobileMenu}>
              <div className="flex flex-col justify-center items-center space-y-2 cursor-pointer">
                <div className="w-6 h-1 bg-white"></div>
                <div className="w-6 h-1 bg-white"></div>
                <div className="w-6 h-1 bg-white"></div>
              </div>
            </div>
          )}
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

            {/* Single Close Button */}
            <button
              onClick={toggleMobileMenu}
              className="absolute top-6 right-6 text-white z-50"
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
            </button>

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
                  className="text-[32px] font-bold text-[#FFA13B]"
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
                      className="block text-center py-4 text-2xl font-medium text-white hover:text-[#FFA13B] transition-all
                      border-b border-gray-700 hover:border-[#FFA13B]"
                      onClick={toggleMobileMenu}
                    >
                      {element.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex space-x-6 mt-16"
              >
                <a
                  href="#"
                  className="text-white hover:text-[#FFA13B] transition-colors"
                >
                  <FaFacebook className="w-8 h-8" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#FFA13B] transition-colors"
                >
                  <FaInstagram className="w-8 h-8" />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#FFA13B] transition-colors"
                >
                  <FaTwitter className="w-8 h-8" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;

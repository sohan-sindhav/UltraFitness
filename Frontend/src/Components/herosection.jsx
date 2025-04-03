import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Herosection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const elements = ["Home", "Gallery", "Reviews", "Contact Us"];

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    // Hide navbar when opening mobile menu
    if (newState) {
      setIsNavbarVisible(false);
    } else {
      // When closing mobile menu, check scroll position
      setIsNavbarVisible(window.scrollY <= 10);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Don't hide/show navbar if mobile menu is open
      if (isMobileMenuOpen) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setIsNavbarVisible(true);
        return;
      }

      if (currentScrollY > lastScrollY) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  return (
    <div className="overflow-x-hidden">
      {/* Navbar - Hide on scroll down, show on scroll up */}
      <motion.div
        className={`fixed w-full bg-black z-50 transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        initial={{ y: 0 }}
      >
        <div className="px-[20px] md:px-[111px] py-[20px] md:py-[25px] font-inknut flex justify-between items-center">
          {/* Logo */}
          <div className="text-[24px] sm:text-[36px] font-bold text-[#FFA13B]">
            UltraFitness
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-[45px]">
            {elements.map((element, index) => (
              <li
                key={index}
                className="text-[22px] text-white hover:text-[#FFA13B] hover:cursor-pointer transition-all list-none"
              >
                {element}
              </li>
            ))}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden z-50" onClick={toggleMobileMenu}>
            <div className="flex flex-col justify-center items-center space-y-2 cursor-pointer">
              <motion.div
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                }}
                className="w-6 h-1 bg-white"
              ></motion.div>
              <motion.div
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-6 h-1 bg-white"
              ></motion.div>
              <motion.div
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
                className="w-6 h-1 bg-white"
              ></motion.div>
            </div>
          </div>
        </div>
      </motion.div>

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
                <div className="text-[32px] font-bold text-[#FFA13B]">
                  UltraFitness
                </div>
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
                    <a
                      href="#"
                      className="block text-center py-4 text-2xl font-medium text-white hover:text-[#FFA13B] transition-all
                      border-b border-gray-700 hover:border-[#FFA13B]"
                      onClick={toggleMobileMenu}
                    >
                      {element}
                    </a>
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

      {/* Hero Section */}
      <div className="pt-20">
        {" "}
        {/* Add padding to account for fixed navbar */}
        <div
          className="relative"
          style={{
            backgroundImage: "url('/Hero_image.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            style={{ zIndex: 0 }}
          ></div>

          <div className="relative z-10">
            <motion.div
              className="px-[20px] sm:px-[50px] md:px-[111px] py-[50px] mt-50 font-josefin text-white font-extrabold"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="p-8 rounded-xl bg-black/30 max-w-max mx-auto sm:mx-0">
                <p className="text-[40px] sm:text-[36px] lg:text-[72px] text-center sm:text-left">
                  Unleash Your <span className="text-[#FFA13B]">Strength</span>
                </p>
                <p className="text-[40px] sm:text-[36px] lg:text-[72px] text-center sm:text-left">
                  Transform Your Life.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative text-[20px] sm:text-[18px] px-[20px] sm:px-[50px] md:px-[111px] py-[15px] mt-50 font-josefin text-white hidden sm:block"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="max-w-[calc(100%_-_50px)] sm:max-w-[calc(100%_-_100px)] md:max-w-[calc(100%_-_750px)] bg-black/50 rounded-3xl mx-3 p-4">
                It doesn't matter if your goal is to get stronger, burn fat, or
                to just stay fit our world class coaches will guide you every
                step of the way.
              </p>
            </motion.div>

            <motion.div
              className="relative text-center sm:text-left px-[20px] sm:px-[50px] md:px-[111px] py-[15px] mt-50 font-josefin text-white"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <button className="bg-[#FFA13B] mx-3 my-6 p-3 sm:p-2 md:p-3 rounded-2xl text-black font-josefin font-semibold border-2 border-transparent transition duration-300 ease-in-out hover:bg-transparent hover:text-white hover:border-white hover:opacity-80">
                Contact Us
              </button>

              <div className="text-white flex justify-center font-josefin py-14">
                Scroll down
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Herosection;

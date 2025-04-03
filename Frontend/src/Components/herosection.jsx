import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Herosection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const elements = ["Home", "Gallery", "Reviews", "Contact Us"];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Navbar */}
      <div className="px-[20px] md:px-[111px] py-[20px] md:py-[76px] font-inknut flex justify-between items-center">
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-40"
            onClick={toggleMobileMenu}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="flex flex-col items-center justify-center h-full space-y-8"
            >
              {elements.map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href="#"
                    className="text-3xl text-white hover:text-[#FFA13B] transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    {element}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div
        className="relative"
        style={{
          backgroundImage: "url('/Hero_image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{ zIndex: -1 }}
        ></div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-[40px] sm:text-[36px] lg:text-[72px] px-[20px] sm:px-[50px] md:px-[111px] py-[50px] mt-50 font-josefin text-white font-extrabold"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="p-4 rounded-xl">
            <p className="text-center sm:text-left">
              Unleash Your <span className="text-[#FFA13B]">Strength</span>
            </p>
            <p className="text-center sm:text-left">Transform Your Life.</p>
          </div>
        </motion.div>

        <motion.div
          className="relative text-[20px] sm:text-[18px] px-[20px] sm:px-[50px] md:px-[111px] py-[15px] mt-50 font-josefin text-white hidden sm:block"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="max-w-[calc(100%_-_50px)] sm:max-w-[calc(100%_-_100px)] md:max-w-[calc(100%_-_750px)] bg-black bg-opacity-50 rounded-3xl mx-3">
            It doesn't matter if your goal is to get stronger, burn fat, or to
            just stay fit our world class coaches will guide you every step of
            the way.
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
  );
}

export default Herosection;

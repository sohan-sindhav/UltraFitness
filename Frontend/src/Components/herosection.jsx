import React, { useState } from "react";
import { motion } from "framer-motion"; // Import the motion component from framer-motion

function Herosection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track if mobile menu is open
  const elements = ["Home", "Gallery", "Reviews", "Contact Us"];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="overflow-x-hidden">
        {/* Prevent horizontal scroll */}
        <div className="px-[20px] md:px-[111px] py-[20px] md:py-[76px] font-inknut flex justify-between items-center">
          {/* Logo */}
          <div className="text-[24px] sm:text-[36px] font-inknut font-bold text-[#FFA13B]">
            UltraFitness
          </div>

          {/* Navbar items for larger screens */}
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
          <div className="md:hidden" onClick={toggleMobileMenu}>
            <div className="flex flex-col justify-center items-center space-y-2 cursor-pointer">
              <div className="w-6 h-1 bg-white"></div>
              <div className="w-6 h-1 bg-white"></div>
              <div className="w-6 h-1 bg-white"></div>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-black bg-opacity-50 p-4 absolute top-0 left-0 w-full h-full z-10 transform transition-all ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={toggleMobileMenu}
        >
          <div className="flex flex-col items-center space-y-6">
            {elements.map((element, index) => (
              <li
                key={index}
                className="text-[24px] text-white hover:text-[#FFA13B] hover:cursor-pointer transition-all list-none"
                onClick={toggleMobileMenu} // Close the menu when an item is clicked
              >
                {element}
              </li>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section Container with Background Image */}
      <div
        className="relative"
        style={{
          backgroundImage: "url('/Hero_image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        {/* Semi-transparent dark overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{ zIndex: -1 }} // Keeps the overlay behind the content
        ></div>

        {/* Hero Section Title with Animation */}
        <motion.div
          className="relative z-10 text-[40px] sm:text-[36px] lg:text-[72px] px-[20px] sm:px-[50px] md:px-[111px] py-[50px] mt-50 font-josefin text-white font-extrabold"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-black bg-opacity-60 p-4 rounded-xl">
            <p className="text-center sm:text-left">
              Unleash Your <span className="text-[#FFA13B]">Strength</span>
            </p>
            <p className="text-center sm:text-left">Transform Your Life.</p>
          </div>
        </motion.div>

        {/* Hero Section Paragraph with Darker Background (Hidden on Mobile) */}
        <motion.div
          className="relative text-[20px] sm:text-[18px] px-[20px] sm:px-[50px] md:px-[111px] py-[15px] mt-50 font-josefin text-white hidden sm:block"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Dark background behind paragraph */}
          <p className="max-w-[calc(100%_-_50px)] sm:max-w-[calc(100%_-_100px)] md:max-w-[calc(100%_-_750px)] bg-black bg-opacity-50 rounded-3xl mx-3">
            It doesn’t matter if your goal is to get stronger, burn fat, or to
            just stay fit our world class coaches will guide you every step of
            the way.
          </p>
        </motion.div>

        {/* Contact Us Button and Scroll Down Text */}
        <motion.div
          className="relative text-center sm:text-left px-[20px] sm:px-[50px] md:px-[111px] py-[15px] mt-50 font-josefin text-white"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Contact Us Button */}
          <button className="bg-[#FFA13B] mx-3 my-6 p-3 sm:p-2 md:p-3 rounded-2xl text-black font-josefin font-semibold border-2 border-transparent transition duration-300 ease-in-out hover:bg-transparent hover:text-white hover:border-white hover:opacity-80">
            Contact Us
          </button>

          {/* Scroll down text */}
          <div className="text-white flex justify-center font-josefin py-14">
            Scroll down
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Herosection;

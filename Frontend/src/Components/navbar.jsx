import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion for animations

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track if mobile menu is open
  const elements = ["Home", "Gallery", "Reviews", "Contact Us"];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <div className="px-[111px] py-[76px] font-inknut flex justify-between items-center">
        {/* Logo */}
        <div className="text-[36px] font-inknut font-bold text-[#FFA13B]">
          UltraFitness
        </div>

        {/* Navbar items for larger screens */}
        <div className="hidden md:flex space-x-[45px]">
          {elements.map((element, index) => (
            <motion.li
              key={index}
              className="text-[22px] text-white hover:text-[#FFA13B] hover:cursor-pointer transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
            >
              {element}
            </motion.li>
          ))}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden" onClick={toggleMobileMenu}>
          <motion.div
            className="flex flex-col justify-center items-center space-y-2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </motion.div>
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
            <motion.li
              key={index}
              className="text-[24px] text-white hover:text-[#FFA13B] hover:cursor-pointer transition-all"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.2 },
                x: { duration: 0.3 },
              }}
              onClick={toggleMobileMenu} // Close the menu when an item is clicked
            >
              {element}
            </motion.li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

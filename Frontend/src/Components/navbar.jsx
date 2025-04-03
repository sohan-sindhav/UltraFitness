import React, { useState } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track if mobile menu is open
  const elements = ["Home", "Gallery", "Reviews", "Contact Us"];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="overflow-x-hidden">
      {" "}
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
  );
}

export default Navbar;

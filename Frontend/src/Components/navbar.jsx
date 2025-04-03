import React from "react";
import { motion } from "framer-motion"; // Import motion for animations

function Navbar() {
  const elements = ["Home", "Gallery", "Reviews", "Contact Us"];

  return (
    <div>
      <div className="px-[111px] py-[76px] font-inknut flex justify-between items-center">
        <div className="text-[36px] font-inknut font-bold text-[#FFA13B]">
          UltraFitness
        </div>
        <div>
          <ul className="flex space-x-[45px]">
            {elements.map((element, index) => (
              <motion.li
                key={index}
                className="text-[22px] text-white hover:text-[#FFA13B] hover:cursor-pointer transition-all"
                initial={{ opacity: 0, scale: 0.9 }} // Starts off small and invisible
                animate={{ opacity: 1, scale: 1 }} // Ends up fully visible and normal size
                whileHover={{ scale: 1.1 }} // Pop-up effect on hover
                transition={{
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }} // Speed up the animation
              >
                {element}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

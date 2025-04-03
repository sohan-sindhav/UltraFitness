import React from "react";
import { motion } from "framer-motion"; // Import the motion component from framer-motion

function Herosection() {
  return (
    <div>
      {/* Container with background image */}
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
          {/* Add text-center for small screens (mobile) */}
          <div className="bg-black bg-opacity-60 p-4 rounded-xl">
            <p className="text-center sm:text-left">
              Unleash Your <span className="text-[#FFA13B]">Strength</span>
            </p>
            <p className="text-center sm:text-left">Transform Your Life.</p>
          </div>
        </motion.div>

        {/* Hero Section Paragraph with Darker Background */}
        <motion.div
          className="relative text-[20px] sm:text-[18px] px-[20px] sm:px-[50px] md:px-[111px] py-[15px] mt-50 font-josefin text-white"
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

          {/* Contact Us Button with Hover Effect */}
          <button className="bg-[#FFA13B] mx-3 my-6 p-3 sm:p-2 md:p-3 rounded-2xl text-black font-josefin font-semibold border-2 border-transparent transition duration-300 ease-in-out hover:bg-transparent hover:text-white hover:border-white hover:opacity-80">
            Contact Us
          </button>
        </motion.div>

        {/* Scroll down text with animation */}
        <motion.div
          className="text-white flex justify-center font-josefin py-14"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Scroll down
        </motion.div>
      </div>
    </div>
  );
}

export default Herosection;

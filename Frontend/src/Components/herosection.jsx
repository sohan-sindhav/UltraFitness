import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Herosection() {
  return (
    <div>
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
            <Link
              to="#contact"
              className="bg-[#FFA13B] mx-3 my-6 p-3 sm:p-2 md:p-3 rounded-2xl text-black font-josefin font-semibold border-2 border-transparent transition duration-300 ease-in-out hover:bg-transparent hover:text-white hover:border-white hover:opacity-80"
            >
              Contact Us
            </Link>

            <div className="text-white flex justify-center font-josefin py-14">
              Scroll down
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Herosection;

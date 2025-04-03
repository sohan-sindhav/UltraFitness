import React, { useState } from "react";
import { motion } from "framer-motion";

function ScheduleSection() {
  const [activeDay, setActiveDay] = useState("Monday");

  const schedule = {
    Monday: [
      {
        time: "6:00 AM",
        name: "Morning Yoga",
        trainer: "Emily",
        duration: "60 min",
      },
      { time: "7:30 AM", name: "HIIT", trainer: "Mike", duration: "45 min" },
      {
        time: "5:30 PM",
        name: "Strength Training",
        trainer: "John",
        duration: "60 min",
      },
    ],
    Tuesday: [
      {
        time: "6:30 AM",
        name: "Pilates",
        trainer: "Sarah",
        duration: "45 min",
      },
      {
        time: "12:00 PM",
        name: "Lunchtime Yoga",
        trainer: "Emily",
        duration: "30 min",
      },
      { time: "6:00 PM", name: "Zumba", trainer: "Lisa", duration: "60 min" },
    ],
    Wednesday: [
      {
        time: "7:00 AM",
        name: "Spin Class",
        trainer: "Alex",
        duration: "45 min",
      },
      { time: "5:00 PM", name: "Boxing", trainer: "Mike", duration: "60 min" },
    ],
    Thursday: [
      { time: "6:00 AM", name: "Yoga", trainer: "Emily", duration: "60 min" },
      {
        time: "5:30 PM",
        name: "CrossFit",
        trainer: "John",
        duration: "60 min",
      },
    ],
    Friday: [
      {
        time: "6:30 AM",
        name: "Pilates",
        trainer: "Sarah",
        duration: "45 min",
      },
      {
        time: "5:00 PM",
        name: "Dance Fitness",
        trainer: "Lisa",
        duration: "60 min",
      },
    ],
    Saturday: [
      {
        time: "8:00 AM",
        name: "Bootcamp",
        trainer: "Alex",
        duration: "90 min",
      },
      {
        time: "10:00 AM",
        name: "Family Yoga",
        trainer: "Emily",
        duration: "60 min",
      },
    ],
  };

  return (
    <div className="bg-black py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl md:text-4xl font-bold font-josefin mb-2"
          >
            Our Weekly
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFA13B] text-3xl md:text-4xl font-bold font-josefin"
          >
            Class Schedule
          </motion.p>
        </div>

        {/* Day Selector - Mobile Friendly */}
        <div className="flex overflow-x-auto pb-4 mb-6 md:mb-8 scrollbar-hide">
          {Object.keys(schedule).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 md:px-6 md:py-3 mx-1 rounded-full font-josefin font-semibold text-sm md:text-base whitespace-nowrap transition-all ${
                activeDay === day
                  ? "bg-[#FFA13B] text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Schedule Cards */}
        <motion.div
          key={activeDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900 rounded-xl p-4 md:p-6"
        >
          <h3 className="text-xl md:text-2xl font-josefin font-bold text-[#FFA13B] mb-4 md:mb-6">
            {activeDay}'s Classes
          </h3>

          <div className="space-y-3 md:space-y-4">
            {schedule[activeDay].map((cls, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className="bg-gray-800 rounded-lg p-3 md:p-5 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4"
              >
                <div className="col-span-1">
                  <p className="text-lg md:text-xl font-josefin text-white font-bold">
                    {cls.time}
                  </p>
                  <p className="text-gray-400 font-josefin text-xs md:text-sm">
                    {cls.duration}
                  </p>
                </div>
                <div className="col-span-1 md:text-center">
                  <p className="text-[#FFA13B] font-josefin font-bold text-base md:text-lg">
                    {cls.name}
                  </p>
                </div>
                <div className="col-span-2 md:col-span-1 md:text-right mt-2 md:mt-0">
                  <p className="text-white font-josefin text-sm md:text-base">
                    With {cls.trainer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download Button */}
        <div className="text-center mt-8 md:mt-10">
          <button className="border-2 border-[#FFA13B] text-[#FFA13B] hover:bg-[#FFA13B] hover:text-black font-josefin font-bold px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base transition-all">
            Download Full Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleSection;

import React from "react";
import { motion } from "framer-motion";

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Transformed my body in just 3 months! The trainers at UltraFitness are incredible.",
      author: "Sarah M.",
      role: "Member since 2022",
      image: "/client1.jpg", // Add your image path
    },
    {
      quote:
        "Hands down the best gym in the city. The energy here is unmatched!",
      author: "John D.",
      role: "Member since 2021",
      image: "/client2.jpg", // Add your image path
    },
    {
      quote:
        "I've never felt more supported in my fitness journey. This community is everything!",
      author: "Lisa T.",
      role: "Member since 2023",
      image: "/client3.jpg", // Add your image path
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-black py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold font-josefin mb-3">
            What Our <span className="text-[#FFA13B]">Members</span> Say
          </h2>
          <div className="w-24 h-1 bg-[#FFA13B] mx-auto mt-4"></div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-[#FFA13B]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#FFA13B]/10"
            >
              {/* Client Image */}
              <div className="w-20 h-20 mb-6 -mt-14 mx-auto rounded-full overflow-hidden border-4 border-[#FFA13B]">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quote */}
              <div className="relative">
                <div className="text-[#FFA13B] text-5xl absolute -top-8 -left-2 opacity-30">
                  "
                </div>
                <p className="text-white font-josefin text-lg mb-8 relative z-10">
                  {testimonial.quote}
                </p>
                <div className="text-[#FFA13B] text-5xl absolute -bottom-6 -right-2 opacity-30 transform rotate-180">
                  "
                </div>
              </div>

              {/* Author */}
              <div className="border-t border-[#FFA13B]/30 pt-6">
                <p className="text-white font-josefin font-bold text-xl">
                  {testimonial.author}
                </p>
                <p className="text-gray-400 font-josefin text-sm mt-1">
                  {testimonial.role}
                </p>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#FFA13B]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-[#FFA13B] hover:bg-[#e8912e] text-black font-josefin font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
            View More Testimonials
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default TestimonialsSection;

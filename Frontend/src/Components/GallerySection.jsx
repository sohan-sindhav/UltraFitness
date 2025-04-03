import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

// Sample gym images (replace with your actual images)
const gymImages = [
  { id: 1, src: "/assets/yoga.jpg", category: "Equipment" },
  { id: 2, src: "/gym-gallery/yoga-class.jpg", category: "Yoga" },
  { id: 3, src: "/gym-gallery/cardio-zone.jpg", category: "Cardio" },
  { id: 4, src: "/gym-gallery/personal-training.jpg", category: "Training" },
  { id: 5, src: "/gym-gallery/locker-room.jpg", category: "Facilities" },
  { id: 6, src: "/gym-gallery/group-class.jpg", category: "Classes" },
];

function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter images by category
  const filteredImages =
    activeCategory === "All"
      ? gymImages
      : gymImages.filter((img) => img.category === activeCategory);

  // Unique categories
  const categories = ["All", ...new Set(gymImages.map((img) => img.category))];

  return (
    <div className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl font-bold font-josefin mb-2"
          >
            Explore Our
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFA13B] text-4xl font-bold font-josefin"
          >
            Gym Facilities
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-josefin font-semibold transition-all ${
                activeCategory === category
                  ? "bg-[#FFA13B] text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.03 }}
              className="group relative overflow-hidden rounded-xl aspect-square"
            >
              {/* Image */}
              <img
                src={image.src}
                alt={`Gym ${image.category}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 transition-all duration-300 group-hover:bg-opacity-20">
                <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="inline-block px-3 py-1 bg-[#FFA13B] text-black rounded-full text-sm font-josefin font-bold mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-white font-josefin text-xl font-bold">
                    {image.category} Area
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-[#FFA13B] text-[#FFA13B] hover:bg-[#FFA13B] hover:text-black font-josefin font-bold px-8 py-3 rounded-full transition-all"
          >
            Book a Tour
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default GallerySection;

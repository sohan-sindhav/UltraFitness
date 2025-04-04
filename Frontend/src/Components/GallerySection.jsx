import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gallery");
        const data = await response.json();
        setGalleryImages(data);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Filter images by category
  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(galleryImages.map((img) => img.category)),
  ];

  if (loading)
    return <div className="text-center py-20">Loading gallery...</div>;

  return (
    <div className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ... (keep your existing header JSX) ... */}

        {/* Image Gallery Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <motion.div
              key={image._id}
              whileHover={{ scale: 1.03 }}
              className="group relative overflow-hidden rounded-xl aspect-square"
            >
              <img
                src={`http://localhost:5000${image.path}`} // Full URL to backend
                alt={`Gym ${image.category}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg"; // Fallback image
                }}
              />

              {/* Overlay with category */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 transition-all duration-300 group-hover:bg-opacity-20">
                <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="inline-block px-3 py-1 bg-[#FFA13B] text-black rounded-full text-sm font-bold mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-white text-xl font-bold">
                    {image.category} Area
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default GallerySection;

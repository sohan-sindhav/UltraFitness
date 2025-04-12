import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    "All",
    "equipment",
    "yoga",
    "cardio",
    "training",
    "facilities",
    "classes",
    "others",
  ];

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get("/api/gallery");
        setGalleryImages(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.tag === activeCategory);

  const openImage = (image) => {
    const index = filteredImages.findIndex((img) => img._id === image._id);
    setCurrentImageIndex(index);
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const goToPrevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === "Escape") {
        closeImage();
      } else if (e.key === "ArrowRight") {
        goToNextImage();
      } else if (e.key === "ArrowLeft") {
        goToPrevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, currentImageIndex, filteredImages]);

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Error loading gallery: {error}
      </div>
    );
  }

  return (
    <section className="bg-black min-h-screen py-12 px-4 sm:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 text-white font-[Poppins] tracking-tight">
            GALLERY
          </h2>
          <div className="w-20 h-1 bg-[#FFA13B] mx-auto mt-4" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-[#FFA13B] text-black shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image._id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                onClick={() => openImage(image)}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-[#FFA13B] text-black rounded-full text-xs font-bold mb-1.5">
                      {image.tag.toUpperCase()}
                    </span>
                    <h3 className="text-white font-semibold text-sm sm:text-base">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No images found in this category</p>
          </div>
        )}

        {/* Enhanced Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Close Button - Top Right */}
              <button
                onClick={closeImage}
                className="absolute top-6 right-6 z-50 text-white hover:text-[#FFA13B] transition-colors"
                aria-label="Close image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image with Cool Zoom Effect */}
              <motion.div
                className="relative w-full max-w-6xl max-h-[90vh]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full h-full max-h-[80vh] object-contain rounded-lg shadow-xl"
                />

                {/* Floating Caption */}
                <motion.div
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-block px-3 py-1 bg-[#FFA13B] text-black rounded-full text-xs font-bold">
                      {selectedImage.tag.toUpperCase()}
                    </span>
                    <h3 className="text-white font-medium text-sm sm:text-base">
                      {selectedImage.title}
                    </h3>
                    <span className="text-gray-300 text-sm">
                      {currentImageIndex + 1} / {filteredImages.length}
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Navigation Arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevImage}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-50 text-white hover:text-[#FFA13B] transition-colors p-2 bg-black/50 rounded-full"
                    aria-label="Previous image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-50 text-white hover:text-[#FFA13B] transition-colors p-2 bg-black/50 rounded-full"
                    aria-label="Next image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;

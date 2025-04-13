import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const GalleryUploader = () => {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    tag: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const tags = [
    "equipment",
    "yoga",
    "cardio",
    "training",
    "facilities",
    "classes",
    "others",
  ];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image!");
    if (!form.title || !form.tag) return alert("Title and tag are required!");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", form.title);
    formData.append("tag", form.tag);

    try {
      setIsUploading(true);
      const response = await axios.post(
        "https://ultrafitness.onrender.com//api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.image?.imageUrl) {
        setImageUrl(response.data.image.imageUrl);
        alert("Image uploaded successfully!");
        setForm({ title: "", tag: "" });
        setImage(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl shadow-xl overflow-hidden w-full max-w-md border border-gray-700"
      >
        {/* Header */}
        <div className="bg-black p-6 border-b border-blue-500">
          <h2 className="text-2xl font-bold text-white text-center">
            UPLOAD TO GALLERY
          </h2>
          <p className="text-gray-400 text-center mt-1">
            Add new content to your collection
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-6">
          {/* File Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Select Image
            </label>
            <div className="flex items-center justify-between bg-gray-700 rounded-lg p-2">
              <span className="text-gray-400 text-sm truncate mr-2">
                {image ? image.name : "No file selected"}
              </span>
              <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer transition-colors">
                Browse
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Image Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white transition-all"
              placeholder="Enter a descriptive title"
            />
          </div>

          {/* Tag Select */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              name="tag"
              value={form.tag}
              onChange={handleFormChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white appearance-none"
            >
              <option value="">Select a category</option>
              {tags.map((tag) => (
                <option key={tag} value={tag} className="bg-gray-800">
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Button */}
          <motion.button
            onClick={handleUpload}
            disabled={isUploading}
            whileHover={!isUploading ? { scale: 1.02 } : {}}
            whileTap={!isUploading ? { scale: 0.98 } : {}}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
              isUploading
                ? "bg-blue-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 shadow-lg"
            }`}
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </span>
            ) : (
              "Upload Image"
            )}
          </motion.button>

          {/* Preview */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 border border-gray-700 rounded-lg bg-gray-900"
            >
              <p className="text-blue-400 font-medium mb-3">
                Uploaded Preview:
              </p>
              <div className="flex justify-center">
                <img
                  src={imageUrl}
                  alt="Uploaded preview"
                  className="max-h-64 rounded-lg border border-gray-700"
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GalleryUploader;

import React, { useState } from "react";
import { motion } from "framer-motion";

const GalleryUpload = () => {
  const [category, setCategory] = useState("Equipment");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const categories = [
    "Equipment",
    "Yoga",
    "Cardio",
    "Training",
    "Facilities",
    "Classes",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage({ text: "Please select an image", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", category);

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setMessage({ text: "Not logged in. Redirecting...", type: "error" });
        setTimeout(() => (window.location.href = "/admin/login"), 2000);
        return;
      }

      const response = await fetch("http://localhost:5000/api/admin/gallery", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");

      setMessage({ text: "Image uploaded successfully!", type: "success" });
      setImage(null);
      setPreview(null);
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Upload to Gallery</h2>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {preview && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Preview</label>
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto max-h-60 rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Upload Image
        </button>
      </form>
    </motion.div>
  );
};

export default GalleryUpload;

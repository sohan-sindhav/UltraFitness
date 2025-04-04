import React, { useState, useEffect } from "react";

const GalleryList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch("http://localhost:5000/api/gallery", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/admin/gallery/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete image");

      setImages(images.filter((img) => img._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Gallery</h2>

      {images.length === 0 ? (
        <p>No images found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image._id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={`http://localhost:5000${image.path}`}
                alt={image.filename}
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-2">
                <p className="font-medium">{image.category}</p>
                <p className="text-sm text-gray-500">
                  {new Date(image.uploadedAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleDelete(image._id)}
                  className="mt-2 text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryList;

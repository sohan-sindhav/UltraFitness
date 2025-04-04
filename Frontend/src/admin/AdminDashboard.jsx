import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GalleryUpload from "./GalleryUpload";
import GalleryList from "./GalleryList";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "upload"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload Images
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "manage"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Gallery
          </button>
        </div>

        <div className="mt-6">
          {activeTab === "upload" ? <GalleryUpload /> : <GalleryList />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

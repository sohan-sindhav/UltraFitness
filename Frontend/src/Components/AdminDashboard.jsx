import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import GalleryUploader from "./GalleryUploader";
import Schedule from "./Schedule";
import Members from "./Members";
import Settings from "./Settings";
import PrivateRoute from "./PrivateRoute";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navItems = [
    { path: "gallery", name: "Gallery Upload" },
    { path: "schedule", name: "Schedule" },
    { path: "members", name: "Members" },
    { path: "settings", name: "Settings" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://ultrafitness.onrender.com/auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-black border-b border-gray-800">
        <h1 className="text-xl font-bold text-orange-500">ADMIN PANEL</h1>
        <button
          onClick={toggleMobileMenu}
          className="text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 bg-black text-white p-6 border-r border-gray-800 flex-col">
        <h1 className="text-2xl font-bold mb-8 text-orange-500">ADMIN PANEL</h1>

        <nav className="flex-1">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <motion.button
                  onClick={() => navigate(`/dashboard/${item.path}`)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    location.pathname.includes(item.path)
                      ? "bg-gray-800 text-orange-400 font-medium"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.name}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        <motion.button
          onClick={handleLogout}
          className="mt-auto w-full text-left px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-gray-800 hover:text-white"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaSignOutAlt className="inline mr-3" />
          Logout
        </motion.button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-black text-white p-6 pt-16"
          >
            <nav className="flex-1">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <motion.button
                      onClick={() => {
                        navigate(`/dashboard/${item.path}`);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        location.pathname.includes(item.path)
                          ? "bg-gray-800 text-orange-400 font-medium"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.name}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.button
              onClick={handleLogout}
              className="mt-auto w-full text-left px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-gray-800 hover:text-white"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaSignOutAlt className="inline mr-3" />
              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 overflow-auto bg-gray-900 ${
          isMobileMenuOpen ? "hidden" : ""
        }`}
      >
        <div className="p-4 md:p-6 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="gallery" element={<GalleryUploader />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="members" element={<Members />} />
          <Route path="settings" element={<Settings />} />
          <Route index element={<GalleryUploader />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Dashboard;

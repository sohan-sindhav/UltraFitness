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
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "gallery", name: "Gallery Upload" },
    { path: "schedule", name: "Schedule" },
    { path: "members", name: "Members" },
    { path: "settings", name: "Settings" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
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

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6 border-r border-gray-800 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-orange-500">ADMIN PANEL</h1>

        <nav className="flex-1">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <motion.button
                  onClick={() => navigate(`/dashboard/${item.path}`)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                    location.pathname.includes(item.path)
                      ? "bg-gray-800 text-orange-400 font-medium"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span>{item.name}</span>
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          className="mt-auto w-full text-left px-4 py-3 rounded-lg transition-all flex items-center text-gray-300 hover:bg-gray-800 hover:text-white"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaSignOutAlt className="mr-3" />
          <span>Logout</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-900">
        <div className="p-0 h-full">
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

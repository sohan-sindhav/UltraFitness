import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HeroSection from "./Components/herosection";
import GallerySection from "./Components/GallerySection";
import ContactSection from "./Components/location";
import OfferSection from "./Components/offersection";
import TestimonialsSection from "./Components/Testimonials";
import ScheduleSection from "./Components/Timetable";
import Navbar from "./Components/navbar";
import Dashboard from "./Components/AdminDashboard";
import PrivateRoute from "./Components/PrivateRoute";

import Login from "./Components/Login";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <div
              className="relative"
              style={{
                backgroundImage: "url('/Hero_image.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
              }}
            >
              <HeroSection />
              <OfferSection />
              <TestimonialsSection />
              <ScheduleSection />
              <ContactSection />
            </div>
          }
        />
        {/* Gallery route */}
        <Route path="/gallery" element={<GallerySection />} />
        {/* Admin routes */}
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
        //admin dashboard routes
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

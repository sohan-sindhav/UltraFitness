import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./Components/herosection";
import GallerySection from "./Components/GallerySection";
import ContactSection from "./Components/location";
import OfferSection from "./Components/offersection";
import TestimonialsSection from "./Components/Testimonials";
import ScheduleSection from "./Components/Timetable";
import Navbar from "./Components/navbar";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home route with all sections */}
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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

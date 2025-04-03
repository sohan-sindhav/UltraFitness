import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./Components/herosection";
import GallerySection from "./Components/GallerySection"; // Updated import
import ContactSection from "./Components/location";
import OfferSection from "./Components/offersection";
import TestimonialsSection from "./Components/Testimonials";
import ScheduleSection from "./Components/Timetable";
import Navbar from "./Components/navbar";

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

        {/* Add other routes as needed */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

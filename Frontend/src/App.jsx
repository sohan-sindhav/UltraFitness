import Herosection from "./Components/herosection";
import Navbar from "./Components/navbar";
import Offersection from "./Components/offersection";

const App = () => {
  return (
    <>
      <div
        className="relative" // Ensure it's positioned correctly for layering
        style={{
          backgroundImage: "url('/Hero_image.png')", // Correct image path
          backgroundSize: "cover", // Ensures the image covers the entire container without distortion
          backgroundPosition: "center", // Keeps the image centered
          backgroundAttachment: "fixed", // Keeps the background fixed while scrolling
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          minHeight: "100vh", // Ensures the div takes at least the full viewport height
        }}
      >
        <Herosection />
        <Offersection />
      </div>
    </>
  );
};

export default App;

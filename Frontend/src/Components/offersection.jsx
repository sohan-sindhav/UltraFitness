import React from "react";

function Offersection() {
  const offerings = [
    {
      title: "Yoga",
      description:
        "Improve flexibility and mindfulness with our expert-led yoga classes",
      image: "/assets/yoga.jpg", // Note the leading slash
    },
    {
      title: "Strength Training",
      description: "Build muscle and power with our weight training programs",
      image: "/assets/ST.jpg",
    },
    {
      title: "Aerobics",
      description: "High-energy cardio workouts to boost your endurance",
      image: "/assets/Aerobics.jpg",
    },
    {
      title: "Zumba",
      description: "Dance your way to fitness with our fun Zumba sessions",
      image: "/assets/Zumba.jpg",
    },
  ];

  return (
    <div className="bg-black py-20">
      {/* Header Section */}
      <div className="text-white flex justify-center pb-20 text-[48px] md:text-[64px] font-bold font-josefin">
        <div className="flex-col justify-center text-center">
          <p>We Offer Something For</p>
          <p className="text-[#FFA13B]">Everybody</p>
        </div>
      </div>

      {/* Offerings Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
          {offerings.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFA13B]/20"
            >
              {/* Image Box */}
              <div className="h-48 md:h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Box */}
              <div className="p-6">
                <h3 className="text-[#FFA13B] text-2xl font-bold font-josefin mb-2">
                  {item.title}
                </h3>
                <p className="text-white font-josefin">{item.description}</p>
                <button className="mt-4 bg-[#FFA13B] text-black px-4 py-2 rounded-lg font-josefin font-semibold hover:bg-opacity-80 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offersection;

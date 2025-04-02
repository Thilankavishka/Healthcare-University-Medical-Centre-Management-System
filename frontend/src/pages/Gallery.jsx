import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaArrowLeft, FaTimes, FaSearchPlus } from "react-icons/fa";

export default function Gallery() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const imageDetails = [
    { name: "Doctors Room", image: "/src/assets/images/gallery/image01.png" },
    {
      name: "Medical Center Bed",
      image: "/src/assets/images/gallery/image02.jpg",
    },
    { name: "Reception Area", image: "/src/assets/images/gallery/image03.jpg" },
    { name: "Waiting Lounge", image: "/src/assets/images/gallery/image04.jpg" },
    {
      name: "Examination Room",
      image: "/src/assets/images/gallery/image05.jpg",
    },
    {
      name: "Pharmacy Section",
      image: "/src/assets/images/gallery/image06.jpg",
    },
    { name: "Emergency Unit", image: "/src/assets/images/gallery/image07.jpg" },
    {
      name: "Outpatient Clinic",
      image: "/src/assets/images/gallery/image08.jpg",
    },
    { name: "Campus View", image: "/src/assets/images/slider/image02.jpg" },
  ];

  const openImage = (img) => {
    setSelectedImage(img);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  return (
    <>
      <div className="bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen p-4 md:p-8 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-gray-700 hover:text-blue-600 z-10"
        >
          <FaArrowLeft className="text-lg" />
          <span className="font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12 pt-4">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Medical Center Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our state-of-the-art medical facilities and serene campus
            environment
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imageDetails.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => openImage(item.image)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4`}
              >
                <h3 className="text-white text-lg font-semibold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.name}
                </h3>
                <div className="flex items-center text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <FaSearchPlus className="mr-2" />
                  Click to enlarge
                </div>
              </div>

              {/* Quick View Badge */}
              {hoveredIndex === index && (
                <div className="absolute top-4 right-4 bg-white/90 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  Quick View
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="relative max-w-6xl w-full">
              <button
                className="absolute -top-12 right-0 text-white hover:text-indigo-300 text-3xl transition-colors duration-200"
                onClick={closeImage}
              >
                <FaTimes className="bg-gray-800/80 hover:bg-gray-700/80 rounded-full p-2" />
              </button>

              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Full resolution"
                  className="max-w-full max-h-[80vh] mx-auto rounded-lg shadow-2xl object-contain"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white text-lg font-medium">
                    {
                      imageDetails.find((img) => img.image === selectedImage)
                        ?.name
                    }
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-4 text-white">
                <button
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  onClick={closeImage}
                >
                  Close
                </button>
                <a
                  href={selectedImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/30 transition-colors"
                >
                  Open Full Size
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>
            All images are property of University of Vavuniya Medical Center
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} - All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}

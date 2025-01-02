import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Gallery() {
  const imagedet = [
    { name: "Doctors room", image: "/src/assets/images/gallery/image01.png" },
    {
      name: "Medical Center bed",
      image: "/src/assets/images/gallery/image02.jpg",
    },
    { name: "Medical Center", image: "/src/assets/images/gallery/image03.jpg" },
    { name: "Medical Center", image: "/src/assets/images/gallery/image04.jpg" },
    { name: "Medical Center", image: "/src/assets/images/gallery/image05.jpg" },
    { name: "Medical Center", image: "/src/assets/images/gallery/image06.jpg" },
    { name: "Medical Center", image: "/src/assets/images/gallery/image07.jpg" },
    { name: "Medical Center", image: "/src/assets/images/gallery/image08.jpg" },
    { name: "Medical Center", image: "/src/assets/images/gallery/image09.jpg" },
  ];

  const [selectimage, setSelectedImage] = useState(null);

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const CloseImage = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="bg-gradient-to-r from-indigo-100 to-purple-20 min-h-screen p-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          Medical Center Gallery
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {imagedet.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-300"
              onClick={() => openImage(item.image)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />
              <h3 className="text-center text-lg font-semibold text-gray-800 py-4">
                {item.name}
              </h3>
            </div>
          ))}
        </div>

        {selectimage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="relative">
              <button
                className="absolute top-4 right-4 text-white bg-gray-900 bg-opacity-60 hover:bg-opacity-80 rounded-full text-2xl p-3 transition-colors duration-300"
                onClick={CloseImage}
              >
                ✕
              </button>
              <img
                src={selectimage}
                alt="Full resolution"
                className="max-w-4xl max-h-screen rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

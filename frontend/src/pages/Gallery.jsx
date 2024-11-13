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

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-gray-100 min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Medical Center Gallery
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imagedet.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              ></img>
              <h3 className="text-center text-lg font-medium text-gray-700 p-4">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

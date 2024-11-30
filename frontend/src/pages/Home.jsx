import Footer from "../components/Footer";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ role, userId }) {
  const currenrtime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      {/* Navbar section */}
      <div className="sec-1 w-full h-fit bg-gradient-to-tl from-[#76dbcf]">
        <Navbar role={role} userId={userId}></Navbar>
        <div className="hero w-full flex flex-col sm:flex-row items-center px-5 sm:px-10">
          <img
            className="w-full sm:w-1/2 h-[200px] sm:h-[300px] object-cover"
            src="/src/assets/images/home.png"
            alt=""
          ></img>

          <div className="hero-text w-full sm:w-1/2 flex flex-col items-center text-center sm:text-left mt-5 sm:mt-0">
            <h1 className="font-semibold text-3xl sm:text-4xl text-blue-700">
              HealthCare
            </h1>
            <h1 className="text-orange-900 font-bold text-4xl sm:text-5xl">
              University of Vavuniya
            </h1>
            <h1 className="text-lg sm:text-xl">
              We are here to provide healthcare to everyone in the University
            </h1>
          </div>
        </div>
      </div>

      {/* Time Section */}
      <div className="bg-red-100 font-medium rounded-lg shadow-lg p-4 mt-5">
        <div className="mb-2">
          <h1 className="text-pink-950 flex items-center justify-center h-30 text-3xl sm:text-4xl font-semibold">
            Time: {currenrtime}
          </h1>
        </div>
        <div>
          <h1 className="text-pink-950 flex items-center justify-center h-30 text-3xl sm:text-4xl font-semibold">
            Date: {currentDate}
          </h1>
        </div>
        <div>
          <h1 className="text-red-900 flex items-center justify-center h-30 text-3xl sm:text-4xl font-semibold">
            Open
          </h1>
        </div>
      </div>

      {/* Message Section */}
      <div className="sec-3 w-full h-fit bg-teal-200 pb-5 mt-5">
        <div className="department-head flex justify-center">
          <h1 className="text-3xl font-semibold mt-1 p-5">Send Us A Message</h1>
        </div>
        <Message></Message>

        {/* Footer */}
        <div className="footer px-5 sm:px-10 bg-gradient-to-b from-[#76dbcf] mt-5">
          <hr className="h-px my-8 border-2" />
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

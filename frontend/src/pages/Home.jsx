import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home({ role, userId }) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [patientCount, setPatientCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAppointmentClick = () => {
    navigate("/AllAppointments");
  };

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/patient/countpatients"
        ); // Adjust the endpoint if needed
        setPatientCount(response.data.count);
      } catch (error) {
        console.error("Error fetching patient count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientCount();

    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Navbar section */}
      <div className="sec-1 w-full h-fit bg-gradient-to-tl from-[#76dbcf]">
        <Navbar role={role} userId={userId}></Navbar>
        <div className="hero w-full flex flex-col sm:flex-row items-center px-5 sm:px-10">
          <img
            className="w-full sm:w-1/2 h-[200px] sm:h-[300px] object-cover"
            src="/src/assets/images/home.png"
            alt="Healthcare"
          />

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

      {/* Time and Total Number of Patients Section */}
      <div className="bg-gray-50 font-medium rounded-lg shadow-lg p-6 mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left side: Time and Date */}
        <div className="flex flex-col justify-center items-start space-y-4">
          <h1 className="text-blue-900 text-3xl sm:text-4xl font-semibold">
            Time:{" "}
            <span className="text-gray-700">
              {currentTime.toLocaleTimeString()}
            </span>
          </h1>
          <h1 className="text-blue-900 text-3xl sm:text-4xl font-semibold">
            Date:{" "}
            <span className="text-gray-700">
              {currentTime.toLocaleDateString()}
            </span>
          </h1>
          <h1 className="text-green-900 text-3xl sm:text-4xl font-semibold">
            Open
          </h1>
        </div>

        {/* Right side: Total Number of Patients */}
        <div className="flex justify-center items-center">
          <h1 className="text-red-800 text-2xl sm:text-3xl font-semibold">
            Total Number of Patients:{" "}
            <span className="text-black">{patientCount}</span>
          </h1>
        </div>
      </div>

      {/* Appointment Section */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleAppointmentClick}
          className="bg-[#4CAF50] text-white py-2.5 px-5 rounded cursor-pointer transition-colors duration-300"
        >
          Add Appointment
        </button>
      </div>

      {/* Message Section */}
      <div className="sec-3 w-full h-fit bg-teal-200 pb-5 mt-5">
        <div className="department-head flex justify-center">
          <h1 className="text-3xl font-semibold mt-1 p-5">Send Us A Message</h1>
        </div>
        <Message />

        {/* Footer */}
        <div className="footer px-5 sm:px-10 bg-gradient-to-b from-[#76dbcf] mt-5">
          <hr className="h-px my-8 border-2" />
          <Footer />
        </div>
      </div>
    </>
  );
}

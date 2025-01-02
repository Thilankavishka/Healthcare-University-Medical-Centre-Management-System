import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Home({ role, userId }) {
  const navigate = useNavigate();
  const currenrtime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  const handleAppointmentClick = () =>{
    navigate("/AllAppointments");
  }
  

import axios from "axios";

export default function Home({ role, userId }) {
  const currenttime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  const [patientCount, setPatientCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/patient/countpatients`
        ); // Adjust the endpoint if needed
        setPatientCount(response.data.count);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient count:", error);
        setLoading(false);
      }
    };

    fetchPatientCount();
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

      {/* Time and Total Number of Patients Section */}
      <div className="bg-gray-50 font-medium rounded-lg shadow-lg p-6 mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left side: Time and Date */}
        <div className="flex flex-col justify-center items-start space-y-4">
          <h1 className="text-blue-900 text-3xl sm:text-4xl font-semibold">
            Time: <span className="text-gray-700">{currenttime}</span>
          </h1>
          <h1 className="text-blue-900 text-3xl sm:text-4xl font-semibold">
            Date: <span className="text-gray-700">{currentDate}</span>
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
      <div className="flex justify-center mt-6 ">
        <button onClick={handleAppointmentClick}
        className="bg-[#4CAF50] text-white py-2.5 px-5 rounded cursor-pointer transition-colors duration-300">Add Appointment</button>
      </div>

      {/*Message Section*/}
      <div className="sec-3 w-full h-fit bg-teal-200  pb-5">
      {/*Apointment Section*/}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-3 bg-green-500 text-white text-base sm:text-lg font-bold rounded-lg shadow-md sm:shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 transition duration-300 w-full max-w-xs sm:max-w-sm">
          Make Appointment
        </button>
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

import Navbar from "./Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Admindashboard({ username }) {
  const [admin, setadmindetails] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/auth/admindetails/${username}`)
      .then((response) => {
        if (response.data.success) {
          setadmindetails(response.data.admindet);
        } else {
          console.log("admin not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }, [username]);

  const navigate = useNavigate();
  const gopatientdetails = () => {
    navigate("/patientdetails");
  };

  const goaddmedicalhistory = () => {
    navigate("/medicalhistoryform");
  };
  const goUserMessages = () => {
    navigate("/usermessages");
  };

  const gomedicalhistory = () => {
    navigate("/medicalhistory");
  };
  const godrugdetails = () => {
    navigate("/drugs");
  };
  const goappointments = () => {
    navigate("/AllAppointments");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-gradient-to-b from-blue-600 to-purple-600 p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Medical Center University of Vavuniya
          </h1>
          <p className="text-sm text-white mt-2">
            Secure and Reliable Healthcare Services
          </p>

          {/* Admin Info Section */}
          <div className="mt-8 text-white">
            <p className="text-lg font-medium mt-4">
              Name: <span className="font-bold">{admin.username}</span>
            </p>
            <p className="text-lg font-medium mt-2">
              Type: <span className="font-bold">{admin.admintype}</span>
            </p>
            <p className="text-lg font-medium mt-2">
              Gender: <span className="font-bold">{admin.gender}</span>
            </p>
            <p className="text-lg font-medium mt-2">
              Account Created:{" "}
              <span className="font-bold">{admin.createdAt}</span>
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Back to home
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome {username}'s Dashboard
          </h1>
          <hr className="mt-2 border-t-2 border-gray-200" />
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Appointments */}
          <div
            className="bg-white rounded-lg shadow-md transform transition-all hover:scale-105 cursor-pointer"
            onClick={goappointments}
          >
            <img
              src="/card_images/appointment.jpg"
              alt="Patient Details"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">Appointments</h2>
              <p className="text-sm text-gray-500 mt-2">
                Click Here to Show Patient Appointments
              </p>
            </div>
          </div>

          {/* Patient Details Card */}
          <div
            className="bg-white rounded-lg shadow-md transform transition-all hover:scale-105 cursor-pointer"
            onClick={gopatientdetails}
          >
            <img
              src="/card_images/patient.jpg"
              alt="Patient Details"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">
                Patient Details
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Click Here to Show Patient Details
              </p>
            </div>
          </div>

          {/* User Messages Card */}
          <div
            className="bg-white rounded-lg shadow-md transform transition-all hover:scale-105 cursor-pointer"
            onClick={goUserMessages}
          >
            <img
              src="/card_images/msg.jpg"
              alt="User Messages"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">User Messages</h2>
              <p className="text-sm text-gray-500 mt-2">
                Click Here to Show User Messages
              </p>
            </div>
          </div>

          {/* Add Medical History Card */}
          <div
            className="bg-white rounded-lg shadow-md transform transition-all hover:scale-105 cursor-pointer"
            onClick={goaddmedicalhistory}
          >
            <img
              src="/card_images/prescription.jpg"
              alt="Medical History"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">
                Add Prescription/Diagnosis
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Click Here to Add Patient Prescription / Diagnosis
              </p>
            </div>
          </div>

          {/* Medical History Card */}
          <div
            className="bg-white rounded-lg shadow-md transform transition-all hover:scale-105 cursor-pointer"
            onClick={gomedicalhistory}
          >
            <img
              src="/card_images/prescription.jpg"
              alt="Medical History"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">
                Prescription/Diagnosis
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Click Here to See Patient Prescription / Diagnosis
              </p>
            </div>
          </div>

          {/* Drug Details Card */}
          <div
            className="bg-white rounded-lg shadow-md transform transition-all hover:scale-105 cursor-pointer"
            onClick={godrugdetails}
          >
            <img
              src="/card_images/drug.jpg"
              alt="Medical History"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">Drug/Details</h2>
              <p className="text-sm text-gray-500 mt-2">
                Click Here to See Drug/Details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

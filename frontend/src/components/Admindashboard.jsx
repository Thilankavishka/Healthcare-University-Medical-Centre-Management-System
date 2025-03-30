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
          // Handle the case when no patient is found
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
    <>
      <div>
        <Navbar />
      </div>
      {/* Header Section */}
      <div className="flex flex-row items-center  h-24 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg px-6">
        <img
          src="src/assets/images/icons/medical.jpg"
          alt="Medical Icon"
          className="w-24 h-24 object-contain"
        />
        <h1 className="text-5xl font-bold text-white tracking-wide ml-8">
          {username}'s Dashboard
        </h1>
      </div>

      {/* Admin Info Section */}
      <div className="flex flex-col justify-start py-12 px-10 bg-gray-50 space-y-4 text-left">
        <p className="text-xl font-medium text-gray-800">
          Name:{" "}
          <span className="text-indigo-600 font-bold">{admin.username}</span>
        </p>
        <p className="text-xl font-medium text-gray-800">
          Type:{" "}
          <span className="text-indigo-600 font-bold">{admin.admintype}</span>
        </p>
        <p className="text-xl font-medium text-gray-800">
          Gender:{" "}
          <span className="text-indigo-600 font-bold">{admin.gender}</span>
        </p>
        <p className="text-xl font-medium text-gray-800">
          Account Created:{" "}
          <span className="text-indigo-600 font-bold">{admin.createdAt}</span>
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16 py-10 bg-gray-100">
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
            <h2 className="text-xl font-bold text-gray-800">Patient Details</h2>
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
    </>
  );
}

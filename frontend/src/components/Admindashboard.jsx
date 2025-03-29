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

  const goRegisterPatient = () => {
    navigate("/register");
  };

  const goMedicalHistoryForm = () => {
    navigate("/medicalhistoryform");
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
        {/* Patient Details Card */}
        <div className="flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <img
              src="/card_images/patient.jpg"
              alt="Patient Details"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h2 className="text-lg font-bold text-center text-gray-800">
                Patient Details
              </h2>
              <p className="text-sm text-center text-gray-600 mb-4">
                Click Here to Show Patient Details
              </p>
              <button
                onClick={gopatientdetails}
                className="block w-full py-2 bg-indigo-500 text-white font-semibold text-center rounded hover:bg-indigo-600"
              >
                Go Patient Details
              </button>
            </div>
          </div>
        </div>

        {/* Register Patient Card */}
        <div className="flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <img
              src="/card_images/register_patient.jpg"
              alt="Register Patient"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h2 className="text-lg font-bold text-center text-gray-800">
                Register Patient
              </h2>
              <p className="text-sm text-center text-gray-600 mb-4">
                Click Here to Register Patient
              </p>
              <button
                onClick={goRegisterPatient}
                className="block w-full py-2 bg-indigo-500 text-white font-semibold text-center rounded hover:bg-indigo-600"
              >
                Register Patient
              </button>
            </div>
          </div>
        </div>

        {/*Add Medical History*/}
        <div className="flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <img
              src="/card_images/register_patient.jpg"
              alt="Register Patient"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h2 className="text-lg font-bold text-center text-gray-800">
                Medical Form
              </h2>
              <p className="text-sm text-center text-gray-600 mb-4">
                Click Here to Add Medical Data
              </p>
              <button
                onClick={goMedicalHistoryForm}
                className="block w-full py-2 bg-indigo-500 text-white font-semibold text-center rounded hover:bg-indigo-600"
              >
                Add Medical Data{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

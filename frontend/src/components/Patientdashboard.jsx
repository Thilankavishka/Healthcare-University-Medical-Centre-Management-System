import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PatientDashboard({ regnum }) {
  const navigate = useNavigate();

  const navigatechangepassword = () => {
    navigate("/changepassword");
  };

  const [patient, setPatientDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/patient/patientdetails/${regnum}`)
      .then((response) => {
        if (response.data.success) {
          setPatientDetails(response.data.patdet);
        } else {
          console.log("Patient not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }, [regnum]);

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
            Welcome {patient ? `${patient.fullname}'s Dashboard` : "Loading..."}
          </h1>
          <hr className="mt-2 border-t-2 border-gray-200" />
        </div>

        {/* Patient Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Registration Number: <span className="text-blue-600">{regnum}</span>
          </h2>
        </div>

        {patient ? (
          <div className="flex space-x-8">
            {/* Left side: Image */}
            <div className="flex-shrink-0 w-1/4">
              <img
                src={`http://localhost:8080${patient.image}`}
                alt="Patient"
                className="w-full h-85 object-cover rounded-lg border-4 border-blue-500"
              />
            </div>

            {/* Right side: Patient details */}
            <div className="flex-1 space-y-4">
              <h3 className="text-xl font-medium text-gray-800">
                Full Name: {patient.fullname}
              </h3>
              <h4 className="text-md text-gray-700">
                Address: {patient.address}
              </h4>
              <p className="text-md text-gray-700">City: {patient.city}</p>
              <p className="text-md text-gray-700">Course: {patient.course}</p>
              <p className="text-md text-gray-700">
                Department: {patient.department}
              </p>
              <p className="text-md text-gray-700">
                Faculty: {patient.faculty}
              </p>
              <p className="text-md text-gray-700">
                Blood Group: {patient.bloodgroup}
              </p>
              <p className="text-md text-gray-700">Gender: {patient.gender}</p>
              <p className="text-md text-gray-700">
                Account Created At: {patient.createdAt}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Loading patient details...</p>
        )}

        {/* Change Password Button */}
        <div className="flex justify-center items-center py-4">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onClick={navigatechangepassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

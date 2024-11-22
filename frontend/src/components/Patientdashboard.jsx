import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

export default function PatientDashboard({ regnum }) {
  const [patient, setPatientDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/patient/patientdetails/${regnum}`)
      .then((response) => {
        if (response.data.success) {
          setPatientDetails(response.data.patdet);
        } else {
          // Handle the case when no patient is found
          console.log("Patient not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }, [regnum]); // Re-run the effect when regnum changes

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Welcome {patient ? `${patient.fullname}'s Dashboard` : "Loading..."}
        </h1>
        <div>
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            {patient ? `${patient.fullname}'s Profile Details` : "Loading..."}
          </h1>
        </div>
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
      </div>
    </div>
  );
}

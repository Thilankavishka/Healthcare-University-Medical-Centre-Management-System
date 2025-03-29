import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PatientDashboard({ regnum }) {
  const navigate = useNavigate();

  const navigatechangepassword = () => {
    navigate("/changepassword");
  };

  const [patient, setPatientDetails] = useState(null);
  const [medicalHistories, setMedicalHistories] = useState([]); // State for medical histories
  const [loading, setLoading] = useState(true); // State for loading status
  const [showMedicalHistories, setShowMedicalHistories] = useState(false); // State to toggle medical histories

  // Fetch patient details
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

  // Fetch medical histories for the patient
  useEffect(() => {
    if (regnum) {
      axios
        .get(`http://localhost:8080/medicalhis/medical-history-user/${regnum}`)
        .then((response) => {
          setMedicalHistories(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching medical histories:", error);
          setLoading(false);
        });
    }
  }, [regnum]);

  // Handle prescription download
  const handleDownloadPrescription = (prescription) => {
    const blob = new Blob([prescription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prescription.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Toggle medical histories visibility
  const toggleMedicalHistories = () => {
    setShowMedicalHistories(!showMedicalHistories);
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

        {/* Medical Histories Section */}
        <div className="mt-8">
          <div className="flex space-x-4 mb-4">
            {/* Toggle Medical Histories Button */}
            <button
              onClick={toggleMedicalHistories}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            >
              {showMedicalHistories
                ? "Hide Medical Histories"
                : "View Medical Histories"}
            </button>

            {/* Change Password Button */}
            <button
              onClick={navigatechangepassword}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Change Password
            </button>
          </div>

          {showMedicalHistories && (
            <>
              {loading ? (
                <p className="text-gray-600">Loading medical histories...</p>
              ) : medicalHistories.length === 0 ? (
                <p className="text-gray-600">No medical histories found.</p>
              ) : (
                <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                  <thead>
                    <tr className="bg-teal-500 text-white">
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Blood Pressure
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Blood Sugar
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Weight
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Temperature
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Diagnosis
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Prescription
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Visit Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicalHistories.map((history, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {history.bloodPressure}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {history.bloodSugar}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {history.weight}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {history.temperature}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {history.diagnosis}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {history.prescription}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {new Date(history.visitDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() =>
                              handleDownloadPrescription(history.prescription)
                            }
                            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                          >
                            Download Prescription
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

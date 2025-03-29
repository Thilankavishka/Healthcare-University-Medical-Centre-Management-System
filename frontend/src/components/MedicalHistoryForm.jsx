import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MedicalHistoryForm() {
  const [formData, setFormData] = useState({
    regNo: "",
    bloodPressure: "",
    bloodSugar: "",
    weight: "",
    temperature: "",
    diagnosis: "",
    prescription: "",
    visitDate: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/medicalhis/medical-history",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        setSuccessMessage("Medical history added successfully!");
        setErrorMessage("");
        // Clear form fields
        setFormData({
          regNo: "",
          bloodPressure: "",
          bloodSugar: "",
          weight: "",
          temperature: "",
          diagnosis: "",
          prescription: "",
          visitDate: "",
        });
        setTimeout(() => navigate("/medicalhistoryform"), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setErrorMessage("Failed to add medical history. Please try again.");
      setSuccessMessage("");
      console.error(error);
    }
  };

  return (
    <>
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
              onClick={() => navigate("/superadmindashboard")}
              className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-8">
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Add Prescription/Diagnosis
            </h1>
            <hr className="mt-2 border-t-2 border-gray-200" />
          </div>

          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {successMessage && (
              <div className="mb-6 text-green-600 text-center text-lg">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 text-red-500 text-center text-lg">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Registration Number */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter registration number"
                  required
                />
              </div>

              {/* Blood Pressure */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Blood Pressure
                </label>
                <input
                  type="text"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blood pressure"
                  required
                />
              </div>

              {/* Blood Sugar */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Blood Sugar
                </label>
                <input
                  type="text"
                  name="bloodSugar"
                  value={formData.bloodSugar}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blood sugar"
                  required
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Weight (kg)
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter weight"
                  required
                />
              </div>

              {/* Temperature */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Temperature (°C)
                </label>
                <input
                  type="text"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter temperature"
                  required
                />
              </div>

              {/* Diagnosis */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Diagnosis
                </label>
                <input
                  type="text"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter diagnosis"
                  required
                />
              </div>

              {/* Prescription */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Prescription Details
                </label>
                <input
                  type="text"
                  name="prescription"
                  value={formData.prescription}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter prescription"
                  required
                />
              </div>

              {/* Visit Date */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Visit Date
                </label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

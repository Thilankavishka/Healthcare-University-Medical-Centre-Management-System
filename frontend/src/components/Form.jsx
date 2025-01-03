import React, { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    regNo: "",
    bloodPressure: "",
    bloodSugar: "",
    weight: "",
    temperature: "",
    diagnosis: "",
    prescription: "",
    visitDate: "",
    medicalReport: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, medicalReport: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    onSubmit(formDataToSend);
    setFormData({
      regNo: "",
      bloodPressure: "",
      bloodSugar: "",
      weight: "",
      temperature: "",
      diagnosis: "",
      prescription: "",
      visitDate: "",
      medicalReport: null,
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Patient Data Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-group">
              <label
                htmlFor="regNo"
                className="block text-sm font-medium text-gray-700"
              >
                Registration Number
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                id="regNo"
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="bloodPressure"
                className="block text-sm font-medium text-gray-700"
              >
                Blood Pressure
              </label>
              <input
                type="number"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                id="bloodPressure"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="bloodSugar"
                className="block text-sm font-medium text-gray-700"
              >
                Blood Sugar
              </label>
              <input
                type="number"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                id="bloodSugar"
                name="bloodSugar"
                value={formData.bloodSugar}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Weight
              </label>
              <input
                type="number"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="temperature"
                className="block text-sm font-medium text-gray-700"
              >
                Temperature
              </label>
              <input
                type="number"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-group">
              <label
                htmlFor="diagnosis"
                className="block text-sm font-medium text-gray-700"
              >
                Diagnosis
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                id="diagnosis"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="prescription"
                className="block text-sm font-medium text-gray-700"
              >
                Medical Prescription
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                id="prescription"
                name="prescription"
                value={formData.prescription}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="visitDate"
                className="block text-sm font-medium text-gray-700"
              >
                Visit Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                id="visitDate"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="medicalReport"
                className="block text-sm font-medium text-gray-700"
              >
                Medical Report
              </label>
              <input
                type="file"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                id="medicalReport"
                name="medicalReport"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

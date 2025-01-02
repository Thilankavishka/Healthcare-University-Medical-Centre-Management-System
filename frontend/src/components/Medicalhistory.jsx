import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Medicalhistory() {
  const navigate = useNavigate();
  const [medicalData, setMedicalData] = useState([]);

  function handleReportClick() {
    navigate("/medical-report");
  }

  return (
    <>
      <div className="medical-history-page">
        <nav className="bg-gradient-to-r from-teal-500 to-blue-500 shadow-lg">
          <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
            <a href="#" className="text-3xl font-bold text-white">
              Healthcare University of Vavuniya
            </a>
            <div className="flex items-center space-x-4">
              <div className="text-white">Medical Centre-UOV</div>
              <div className="text-gray-200 font-semibold">Super Admin</div>
            </div>
          </div>
        </nav>

        <div className="flex">
          <div className="content flex-1 p-10">
            <div className="text-4xl font-semibold text-gray-900 mb-6">
              USERS | MEDICAL HISTORY
            </div>
            <div className="table-container">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                View Medical History
              </h3>
              <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead>
                  <tr className="bg-teal-500 text-white">
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Reg No
                    </th>
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
                      Medical Prescription
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Visit Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Medical Report
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {medicalData.map((data, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {data.regNo}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {data.bloodPressure}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {data.bloodSugar}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {data.weight}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {data.temperature}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {data.diagnosis}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {data.prescription}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {data.visitDate}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          className="bg-teal-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-teal-700 focus:outline-none"
                          onClick={handleReportClick}
                        >
                          View Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

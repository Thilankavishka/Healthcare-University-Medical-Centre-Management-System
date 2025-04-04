import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";

export default function MorePatientDetails() {
  const [medicalHistories, setMedicalHistories] = useState([]); // State for medical histories
  const [loading, setLoading] = useState(true); // State for loading status
  const [showMedicalHistories, setShowMedicalHistories] = useState(false); // State to toggle medical histories

  const location = useLocation();
  const { regnum, patientDetails } = location.state; // Access regnum and patientDetails from state

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
  // const handleDownloadPrescription = (prescription) => {
  //   const blob = new Blob([prescription], { type: "text/plain" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "prescription.txt";
  //   link.click();
  //   URL.revokeObjectURL(url);
  // };

  const handleDownloadPrescription = (
    regNo,
    bloodPressure,
    bloodSugar,
    weight,
    temperature,
    diagnosis,
    visitDate,
    prescription
  ) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Prescription for Registration No: ${regNo}`, 10, 15);

    doc.setFontSize(12);
    doc.text(`Blood Pressure: ${bloodPressure}`, 10, 25);
    doc.text(`Blood Sugar: ${bloodSugar}`, 10, 35);
    doc.text(`Weight: ${weight}`, 10, 45);
    doc.text(`Temperature: ${temperature}`, 10, 55);
    doc.text(`Diagnosis: ${diagnosis}`, 10, 65);
    doc.text(`Visit Date: ${new Date(visitDate).toLocaleDateString()}`, 10, 75);

    doc.text("Prescription:", 10, 85);
    const splitText = doc.splitTextToSize(prescription, 180);
    doc.text(splitText, 10, 95);

    doc.setFontSize(10);
    doc.text(
      "Generated by Healthcare System",
      10,
      doc.internal.pageSize.height - 10
    );

    const formattedBP = bloodPressure.replace(/\//g, "-");
    doc.save(`Prescription_${regNo}_BP-${formattedBP}_${visitDate}.pdf`);
  };

  // Toggle medical histories visibility
  const toggleMedicalHistories = () => {
    setShowMedicalHistories(!showMedicalHistories);
  };

  return (
    <>
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8">
          {/* Header Section */}
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center md:text-left">
            {patientDetails.fullname} Details
          </h2>

          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 items-center md:items-start">
            {/* Image Section */}
            <div className="flex-shrink-0 flex items-center justify-center mb-6 md:mb-0 md:mr-8">
              <img
                src={`http://localhost:8080${patientDetails.image}`}
                alt="Patient"
                className="w-72 h-72 rounded-lg border-4 border-blue-300 shadow-xl transform transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Patient Details Section */}
            <div className="flex-1 space-y-4 text-gray-700">
              <div className="space-y-2">
                <p className="text-lg">
                  <strong className="text-gray-900">
                    Registration Number:
                  </strong>{" "}
                  {patientDetails.regnum}
                </p>
                <p className="text-lg">
                  <strong className="text-gray-900">Full Name:</strong>{" "}
                  {patientDetails.fullname}
                </p>
                <p className="text-lg">
                  <strong className="text-gray-900">Address:</strong>{" "}
                  {patientDetails.address}
                </p>
                <p className="text-lg">
                  <strong className="text-gray-900">City:</strong>{" "}
                  {patientDetails.city}
                </p>
                <p className="text-lg">
                  <strong className="text-gray-900">Course:</strong>{" "}
                  {patientDetails.course}
                </p>
                <p className="text-lg">
                  <strong className="text-gray-900">Department:</strong>{" "}
                  {patientDetails.department}
                </p>
                <p className="text-lg">
                  <strong className="text-gray-900">Faculty:</strong>{" "}
                  {patientDetails.faculty}
                </p>
                <p className="text-lg">
                  <strong className="text-gray-900">Blood Group:</strong>{" "}
                  {patientDetails.bloodgroup}
                </p>
                <p className="text-lg">
                  <strong className="text-gray-900">Gender:</strong>{" "}
                  {patientDetails.gender}
                </p>
                <p className="text-lg">
                  <strong className="text-gray-900">Account Created At:</strong>{" "}
                  {new Date(patientDetails.createdAt).toLocaleString()}
                </p>
                <p className="text-lg">
                  <strong className="text-gray-900">Updated At:</strong>{" "}
                  {new Date(patientDetails.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
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
                                handleDownloadPrescription(
                                  history.regNo,
                                  history.prescription,
                                  history.bloodPressure,
                                  history.bloodSugar,
                                  history.weight,
                                  history.temperature,
                                  history.diagnosis,
                                  history.visitDate
                                )
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
    </>
  );
}

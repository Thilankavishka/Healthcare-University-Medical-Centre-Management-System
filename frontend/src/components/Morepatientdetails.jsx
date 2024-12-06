import { useLocation } from "react-router-dom";

export default function MorePatientDetails() {
  const location = useLocation();
  const patientDetails = location.state;

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
          <button className="mt-8 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition duration-200">
            Patient Medical History
          </button>
        </div>
      </div>
    </>
  );
}

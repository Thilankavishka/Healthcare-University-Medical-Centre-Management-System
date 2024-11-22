import Navbar from "./Navbar";

export default function Patientdashboard({ regnum }) {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            Patient Dashboard
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800">
              Registration Number:{" "}
              <span className="text-blue-600">{regnum}</span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

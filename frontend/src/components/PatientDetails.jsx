import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientDetails() {
  const [patient, setPatient] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/patient/getpatientdetails")
      .then((res) => {
        setPatient(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [patientCount, setPatientCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/patient/countpatients`
        ); // Adjust the endpoint if needed
        setPatientCount(response.data.count);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient count:", error);
        setLoading(false);
      }
    };

    fetchPatientCount();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Navigate to more patient details
  const goMorePatientdetails = (item) => {
    navigate("/morepatientdetails", {
      state: { regnum: item.regnum, patientDetails: item },
    }); // Pass both regnum and patientDetails
  };

  // Filter the patients based on the search term
  const filteredPatients = patient.filter(
    (item) =>
      item.regnum.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete patients function
  const handleDelete = async (regnum) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/patient/${regnum}`
      );

      if (response.status === 200) {
        alert("Patient deleted successfully.");
        setPatient((prev) => prev.filter((item) => item.regnum !== regnum));
      } else {
        alert("Failed to delete the patient. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("An error occurred while deleting the patient.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Patient Details
      </h1>

      {/* Search Bar and Total Number of Patients Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-md">
        {/* Left side: Search Bar */}
        <div className="w-full sm:w-2/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search by Reg. Number, Name, Faculty, or Gender"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Right side: Total Number of Patients */}
        <div className="flex justify-center items-center">
          <h1 className="text-blue-600 text-2xl sm:text-3xl font-semibold">
            Total Patients:{" "}
            <span className="text-gray-800">{patientCount}</span>
          </h1>
        </div>
      </div>

      {/* Patient Details Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
            <tr>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Reg. Number
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Full Name
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Faculty
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Gender
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((item, key) => (
                <tr
                  key={key}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.regnum}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.fullname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.faculty}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.gender}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center items-center">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                      onClick={() => goMorePatientdetails(item)}
                    >
                      More
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all">
                      Update
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                      onClick={() => handleDelete(item.regnum)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4 font-medium"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

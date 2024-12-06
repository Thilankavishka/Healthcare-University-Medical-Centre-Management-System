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

  //when navigate morepatient details items willnavigate to /morepatientdetails
  const goMorePatientdetails = (item) => {
    navigate("/morepatientdetails", { state: item });
  };

  // Filter the patients based on the serach term
  const filteredPatients = patient.filter(
    (item) =>
      item.regnum.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Patient Details</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by Reg. Number, Name, Faculty, or Gender"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white text-left text-sm text-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-300  px-4 py-2 font-large text-gray-700 text-center">
                Reg. Number
              </th>
              <th className="border border-gray-300  px-4 py-2 font-large text-gray-700 text-center">
                Full Name
              </th>
              <th className="border border-gray-300  px-4 py-2 font-large text-gray-700 text-center">
                Faculty
              </th>
              <th className="border border-gray-300  px-4 py-2 font-large text-gray-700 text-center">
                Gender
              </th>
              <th className="border border-gray-300  px-4 py-2 font-large text-gray-700 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? ( //check the search patient exist or not
              filteredPatients.map((item, key) => (
                <tr key={key} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.regnum}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.fullname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.faculty}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.gender}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center items-center">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={() => goMorePatientdetails(item)}
                    >
                      More
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                      Update
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              //if there are not any matching details
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

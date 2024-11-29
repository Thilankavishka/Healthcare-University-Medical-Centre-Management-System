import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientDetails() {
  const [patient, setPatient] = useState([]);
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

  const goMorePatientdetails = (item) => {
    navigate("/morepatientdetails", { state: item });
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Patient Details</h1>
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
            {patient.map((item, key) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

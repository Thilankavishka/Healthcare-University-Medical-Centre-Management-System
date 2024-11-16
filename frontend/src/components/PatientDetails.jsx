import axios from "axios";
import { useEffect, useState } from "react";

export default function PatientDetails() {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/patient/getpatientdetails")
      .then((res) => {
        setPatient(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Patient Details</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Registration Number</th>
              <th className="p-4 text-left">Full Name</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Faculty</th>
              <th className="p-4 text-left">Blood Group</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">Image</th>
            </tr>
          </thead>
          <tbody>
            {patient.map((item, key) => (
              <tr key={key} className="even:bg-gray-100 hover:bg-gray-50">
                <td className="p-4">{item.regnum}</td>
                <td className="p-4">{item.fullname}</td>
                <td className="p-4">{item.address}</td>
                <td className="p-4">{item.city}</td>
                <td className="p-4">{item.course}</td>
                <td className="p-4">{item.department}</td>
                <td className="p-4">{item.faculty}</td>
                <td className="p-4">{item.bloodgroup}</td>
                <td className="p-4">{item.gender}</td>
                <td className="p-4">
                  <img
                    src={`http://localhost:8080${item.image}`}
                    alt="Patient"
                    className="w-40 h-30  object-cover border"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

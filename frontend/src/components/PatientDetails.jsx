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

  //when navigate morepatient details items willnavigate to /morepatientdetails
  const goMorePatientdetails = (item) => {
    navigate("/morepatientdetails", { state: item });
  };

  // Filter the patients based on the serach term
  const filteredPatients = patient.filter(
    (item) =>
      (item.regnum?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item.fullname?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item.faculty?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (item.gender?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );
  

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

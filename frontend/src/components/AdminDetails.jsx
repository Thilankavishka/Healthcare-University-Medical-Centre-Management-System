import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDetails() {
  const [admin, setAdmin] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/getadmindetails")
      .then((res) => {
        setAdmin(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteAdmin = async (username) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/auth/${username}`
      );

      if (response.status === 200) {
        alert("Admin deleted successfully.");
        setAdmin((prev) => prev.filter((item) => item.username !== username));
      } else {
        alert("Failed to delete the admin. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("An error occurred while deleting the admin.");
    }
  };

  // Navigate to Update Admin details
  const goUpdateAdmin = (item) => {
    navigate("/updateadmin", { state: item });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Details
      </h1>

      {/* Admin Details Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
            <tr>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Username
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Gender
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Type
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {admin.map((item, key) => (
              <tr key={key} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {item.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.gender}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.admintype}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center items-center">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => goUpdateAdmin(item.username)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteAdmin(item.username)}
                  >
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

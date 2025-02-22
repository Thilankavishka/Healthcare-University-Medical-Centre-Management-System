import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDetails() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/getadmindetails")
      .then((res) => {
        setAdmin(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
            {admin.length > 0 ? (
              admin.map((item, key) => (
                <tr
                  key={key}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.gender}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.admintype}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center items-center">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all">
                      Update
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 py-4 font-medium"
                >
                  No admin records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

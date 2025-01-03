import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming React Router is being used

const Drug = ({ userRole }) => {
  const [drugs, setDrugs] = useState([]);
  const [newDrug, setNewDrug] = useState({ name: "", quantity: "" });
  const [editingDrug, setEditingDrug] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch drugs from the API
    axios
      .get("/api/drugs")
      .then((response) => setDrugs(response.data))
      .catch((error) => console.error("Error fetching drugs:", error));
  }, []);

  const handleAddDrug = () => {
    axios
      .post("/api/drugs", newDrug)
      .then((response) => {
        setDrugs([...drugs, response.data]);
        setNewDrug({ name: "", quantity: "" });
      })
      .catch((error) => console.error("Error adding drug:", error));
  };

  const handleEditDrug = (id) => {
    axios
      .put(`/api/drugs/${id}`, editingDrug)
      .then(() => {
        setDrugs(drugs.map((drug) => (drug.id === id ? editingDrug : drug)));
        setEditingDrug(null);
      })
      .catch((error) => console.error("Error editing drug:", error));
  };

  const handleDeleteDrug = (id) => {
    axios
      .delete(`/api/drugs/${id}`)
      .then(() => setDrugs(drugs.filter((drug) => drug.id !== id)))
      .catch((error) => console.error("Error deleting drug:", error));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Drugs</h1>

      {/* Navigation Buttons */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Home
        </button>
      </div>

      {/* Drugs Table */}
      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">No</th>
            <th className="px-4 py-2 border">Drug No</th>
            <th className="px-4 py-2 border">Drug Name</th>
            {userRole === "superadmin" && (
              <>
                <th className="px-4 py-2 border">Edit</th>
                <th className="px-4 py-2 border">Delete</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <tr key={drug.id} className="odd:bg-white even:bg-gray-50">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{drug.id}</td>
              <td className="px-4 py-2 border">{drug.name}</td>
              {userRole === "superadmin" && (
                <>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => setEditingDrug(drug)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDeleteDrug(drug.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {userRole === "superadmin" && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <button
                  onClick={handleAddDrug}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add Drug
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Drug Section */}
      {editingDrug && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Edit Drug</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={editingDrug.name}
              onChange={(e) =>
                setEditingDrug({ ...editingDrug, name: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={editingDrug.quantity}
              onChange={(e) =>
                setEditingDrug({ ...editingDrug, quantity: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <button
            onClick={() => handleEditDrug(editingDrug.id)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  )D
};

export default drug;

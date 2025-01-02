import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming React Router is being used

const Drugs = ({ userRole }) => {
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
    <div>
      <h1>Drugs</h1>

      {/* Navigation Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => navigate(-1)} style={{ marginRight: "10px" }}>
          Back
        </button>
        <button onClick={() => navigate("/")} style={{ marginRight: "10px" }}>
          Home
        </button>
      </div>

      {/* Drugs Table */}
      <table
        border="1"
        style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Drug No</th>
            <th>Drug Name</th>
            {userRole === "superadmin" && (
              <>
                <th>Edit</th>
                <th>Delete</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <tr key={drug.id}>
              <td>{index + 1}</td>
              <td>{drug.id}</td>
              <td>{drug.name}</td>
              {userRole === "superadmin" && (
                <>
                  <td>
                    <button onClick={() => setEditingDrug(drug)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteDrug(drug.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {userRole === "superadmin" && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                <button onClick={handleAddDrug}>Add Drug</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Drug Section */}
      {editingDrug && (
        <div style={{ marginTop: "20px" }}>
          <h2>Edit Drug</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingDrug.name}
            onChange={(e) =>
              setEditingDrug({ ...editingDrug, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Quantity"
            value={editingDrug.quantity}
            onChange={(e) =>
              setEditingDrug({ ...editingDrug, quantity: e.target.value })
            }
          />
          <button onClick={() => handleEditDrug(editingDrug.id)}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Drugs;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./drugs.css";

const DrugsManagement = ({ role, drugDatabase }) => {
  const [drugs, setDrugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching drug data from drugDatabase
    setDrugs(drugDatabase);
  }, [drugDatabase]);

  const handleAddDrug = () => {
    navigate("/add-drug");
  };

  const handleEditDrug = (id) => {
    navigate(`/edit-drug/${id}`);
  };

  const handleDeleteDrug = (id) => {
    if (window.confirm("Are you sure you want to delete this drug?")) {
      // Logic for deleting a drug
      const updatedDrugs = drugs.filter((drug) => drug.id !== id);
      setDrugs(updatedDrugs);
      console.log(`Drug with ID: ${id} deleted.`);
    }
  };

  return (
    <div className="drugs-container">
      <h1>Drugs Management</h1>
      <table className="drugs-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Drug Number</th>
            <th>Drug Name</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <tr key={drug.id} className="drugs-row">
              <td>{index + 1}</td>
              <td>{drug.number}</td>
              <td>{drug.name}</td>
              {role === "admin" && (
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditDrug(drug.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteDrug(drug.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {role === "admin" && (
        <button className="add-button" onClick={handleAddDrug}>
          Add Drug
        </button>
      )}
      <button className="home-button" onClick={() => console.log("Go Home")}>Return to Home</button>
    </div>
  );
};

export default DrugsManagement;

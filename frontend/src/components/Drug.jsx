import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Drugs Management</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>No.</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Drug Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Drug Name</th>
            {role === "admin" && <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <tr key={drug.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>{index + 1}</td>
              <td style={{ padding: '8px' }}>{drug.number}</td>
              <td style={{ padding: '8px' }}>{drug.name}</td>
              {role === "admin" && (
                <td style={{ padding: '8px' }}>
                  <button
                    style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', margin: '5px' }}
                    onClick={() => handleEditDrug(drug.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ padding: '8px 16px', backgroundColor: '#f44336', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', margin: '5px' }}
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
        <button
          style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', margin: '5px' }}
          onClick={handleAddDrug}
        >
          Add Drug
        </button>
      )}
      <button
        style={{ padding: '8px 16px', backgroundColor: '#2196F3', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', margin: '5px' }}
        onClick={() => console.log("Go Home")}
      >
        Return to Home
      </button>
    </div>
  );
};

export default drugsManagement;

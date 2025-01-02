import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DrugForm = ({ drugDatabase, setDrugDatabase }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const existingDrug = isEdit ? drugDatabase.find((drug) => drug.id === parseInt(id)) : null;

  const [drugDetails, setDrugDetails] = useState(
    existingDrug || { number: `D${drugDatabase.length + 1}`.padStart(4, "0"), name: "", distributor: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrugDetails({ ...drugDetails, [name]: value });
  };

  const handleSave = () => {
    if (window.confirm("Are you sure you want to save these details?")) {
      if (isEdit) {
        const updatedDatabase = drugDatabase.map((drug) =>
          drug.id === parseInt(id) ? { ...drugDetails, id: parseInt(id) } : drug
        );
        setDrugDatabase(updatedDatabase);
        console.log("Drug details updated.");
      } else {
        setDrugDatabase([...drugDatabase, { ...drugDetails, id: drugDatabase.length + 1 }]);
        console.log("New drug added.");
      }
      navigate("/");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/");
    }
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{isEdit ? "Edit Drug" : "Add Drug"}</h1>
      <form style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', margin: '10px 0' }}>
          Drug Serial No:
          <input type="text" value={drugDetails.number} disabled style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </label>
        <label style={{ display: 'block', margin: '10px 0' }}>
          Drug Name:
          <input
            type="text"
            name="name"
            value={drugDetails.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        <label style={{ display: 'block', margin: '10px 0' }}>
          Distributor Name:
          <input
            type="text"
            name="distributor"
            value={drugDetails.distributor}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        <button
          type="button"
          style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', margin: '5px' }}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          type="button"
          style={{ padding: '8px 16px', backgroundColor: '#f44336', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer', margin: '5px' }}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default drugForm;

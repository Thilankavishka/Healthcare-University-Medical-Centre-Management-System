import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./drugs.css";

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
    <div className="drug-form-container">
      <h1>{isEdit ? "Edit Drug" : "Add Drug"}</h1>
      <form className="drug-form">
        <label>
          Drug Serial No:
          <input type="text" value={drugDetails.number} disabled />
        </label>
        <label>
          Drug Name:
          <input
            type="text"
            name="name"
            value={drugDetails.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Distributor Name:
          <input
            type="text"
            name="distributor"
            value={drugDetails.distributor}
            onChange={handleChange}
          />
        </label>
        <button type="button" className="save-button" onClick={handleSave}>
          Save
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default DrugForm;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDrug() {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !dosage || quantity <= 0) {
      setErrorMessage(
        "All fields are required and quantity must be greater than 0"
      );
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/drugs", {
        name,
        dosage,
        quantity,
      });

      if (res.data.success) {
        setSuccessMessage(res.data.message);
        setErrorMessage("");
        setName("");
        setDosage("");
        setQuantity(0);
        navigate("/drugs");
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  function handleClick() {
    navigate("/drugs");
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-gradient-to-b from-blue-600 to-purple-600 p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Drug Inventory Management
          </h1>
          <p className="text-sm text-white mt-2">
            Manage and Add Drugs to Inventory
          </p>
        </div>
        <div>
          <button
            onClick={handleClick}
            className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Add New Drug</h1>
          <hr className="mt-2 border-t-2 border-gray-200" />
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {successMessage && (
            <div className="mb-6 text-green-600 text-center text-lg">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-6 text-red-600 text-center text-lg">
              {errorMessage}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Drug Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Drug Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter drug name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Dosage */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Dosage
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Quantity
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
                min="1"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                Add Drug
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

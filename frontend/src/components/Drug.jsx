import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DrugInventory() {
  const [drugs, setDrugs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:8080/drugs")
      .then((response) => response.json())
      .then((data) => setDrugs(data))
      .catch((error) => console.error("Error fetching drugs:", error));
  }, []);

  const filteredDrugs = drugs.filter((drug) =>
    drug.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedDrugs = [...filteredDrugs].sort((a, b) => {
    let fieldA = a[sortField];
    let fieldB = b[sortField];
    if (typeof fieldA === "string") fieldA = fieldA.toLowerCase();
    if (typeof fieldB === "string") fieldB = fieldB.toLowerCase();
    return sortOrder === "asc" ? (fieldA > fieldB ? 1 : -1) : fieldA < fieldB ? 1 : -1;
  });

  const getQuantityColor = (quantity) => {
    if (quantity < 50) return "bg-red-100 text-red-800";
    if (quantity < 100) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  function handleClick() {
    navigate("/addDrugs");
  }

  const handleUpdate = (drug) => {
    navigate("/updateDrugs", { state: { drug } });
  };
  
  

  const handleDelete = async (drugId) => {
    if (window.confirm("Are you sure you want to delete this drug?")) {
      try {
        const response = await fetch(`http://localhost:8080/drugs/${drugId}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          setDrugs(drugs.filter((drug) => drug._id !== drugId));
        } else {
          console.error("Failed to delete drug");
        }
      } catch (error) {
        console.error("Error deleting drug:", error);
      }
    }
  };
  


  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Drug Inventory Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleClick}>
            Add Drug
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search drugs by name..."
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Sort by:</span>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="dosage">Dosage</option>
              <option value="quantity">Quantity</option>
            </select>
            <button
              className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["name", "dosage", "quantity"].map((field) => (
                  <th
                    key={field}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setSortOrder(sortField === field ? (sortOrder === "asc" ? "desc" : "asc") : "asc");
                      setSortField(field);
                    }}
                  >
                    <div className="flex items-center">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedDrugs.map((drug, index) => (
                <tr
                  key={index}
                  className={`hover:bg-blue-50 cursor-pointer transition-colors ${
                    selectedDrug === index ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setSelectedDrug(selectedDrug === index ? null : index)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{drug.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{drug.dosage}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getQuantityColor(drug.quantity)}`}>
                      {drug.quantity} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right justify-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => handleUpdate(drug)}>
                      Update
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => handleDelete(drug._id)}>
                      Delete
                    </button>
                  </td>                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
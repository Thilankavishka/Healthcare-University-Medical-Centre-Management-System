import { useState } from "react";

const drugData = [
  { name: "Paracetamol", dosage: "125mg", quantity: 100 },
  { name: "Paracetamol", dosage: "500mg", quantity: 150 },
  { name: "Ibuprofen", dosage: "200mg", quantity: 200 },
  { name: "Ibuprofen", dosage: "400mg", quantity: 100 },
  { name: "Amoxicillin", dosage: "250mg", quantity: 75 },
  { name: "Amoxicillin", dosage: "500mg", quantity: 80 },
  { name: "Metformin", dosage: "500mg", quantity: 120 },
  { name: "Metformin", dosage: "850mg", quantity: 90 },
  { name: "Atorvastatin", dosage: "10mg", quantity: 60 },
  { name: "Atorvastatin", dosage: "20mg", quantity: 50 },
  { name: "Omeprazole", dosage: "20mg", quantity: 100 },
  { name: "Omeprazole", dosage: "40mg", quantity: 80 },
  { name: "Azithromycin", dosage: "250mg", quantity: 45 },
  { name: "Azithromycin", dosage: "500mg", quantity: 50 },
  { name: "Losartan", dosage: "25mg", quantity: 70 },
  { name: "Losartan", dosage: "50mg", quantity: 60 },
  { name: "Cetirizine", dosage: "10mg", quantity: 90 },
  { name: "Ranitidine", dosage: "150mg", quantity: 40 },
  { name: "Ranitidine", dosage: "300mg", quantity: 35 },
  { name: "Amlodipine", dosage: "5mg", quantity: 100 },
  { name: "Amlodipine", dosage: "10mg", quantity: 80 },
  { name: "Ciprofloxacin", dosage: "250mg", quantity: 50 },
  { name: "Ciprofloxacin", dosage: "500mg", quantity: 60 },
  { name: "Doxycycline", dosage: "100mg", quantity: 55 },
  { name: "Furosemide", dosage: "40mg", quantity: 70 },
  { name: "Furosemide", dosage: "80mg", quantity: 30 },
];


export default function DrugInventory() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDrug, setSelectedDrug] = useState(null);

  const filteredDrugs = drugData.filter((drug) =>
    drug.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedDrugs = [...filteredDrugs].sort((a, b) => {
    let fieldA = a[sortField];
    let fieldB = b[sortField];
    if (typeof fieldA === "string") fieldA = fieldA.toLowerCase();
    if (typeof fieldB === "string") fieldB = fieldB.toLowerCase();
    return sortOrder === "asc"
      ? fieldA > fieldB
        ? 1
        : -1
      : fieldA < fieldB
      ? 1
      : -1;
  });

  const getQuantityColor = (quantity) => {
    if (quantity < 50) return "bg-red-100 text-red-800";
    if (quantity < 100) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">Drug Inventory Management</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
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
                      {sortField === field && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedDrugs.map((drug, index) => (
                <tr 
                  key={index} 
                  className={`hover:bg-blue-50 cursor-pointer transition-colors ${selectedDrug === index ? 'bg-blue-100' : ''}`}
                  onClick={() => setSelectedDrug(selectedDrug === index ? null : index)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">{drug.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{drug.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{drug.dosage}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getQuantityColor(drug.quantity)}`}>
                      {drug.quantity} units
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedDrugs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium">No drugs found</h3>
            <p className="mt-1 text-sm">Try adjusting your search query</p>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          Showing {sortedDrugs.length} of {drugData.length} medications
        </div>
      </div>
    </div>
  );
}
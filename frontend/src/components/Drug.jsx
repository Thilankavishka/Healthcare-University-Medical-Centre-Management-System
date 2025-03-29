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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Drug Inventory</h1>
      <input
        type="text"
        placeholder="Search drugs..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            {["name", "dosage", "quantity"].map((field) => (
              <th
                key={field}
                className="border p-2 cursor-pointer"
                onClick={() => {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  setSortField(field);
                }}
              >
                {field.toUpperCase()}{" "}
                {sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDrugs.map((drug, index) => (
            <tr key={index} className="border">
              <td className="p-2">{drug.name}</td>
              <td className="p-2">{drug.dosage}</td>
              <td className="p-2">{drug.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
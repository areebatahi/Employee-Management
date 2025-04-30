import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialEmployees = [
  { id: 1, name: "John Doe", email: "john@example.com", salary: 75000 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", salary: 62000 },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", salary: 80000 },
];

const SalaryPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(initialEmployees);

  const handleSalaryChange = (id, newSalary) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, salary: Number(newSalary) } : emp
      )
    );
  };

  const handleSave = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    console.log("Saving salary for:", employee); // Replace with API call
    alert(`Salary for ${employee.name} updated to $${employee.salary}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Set Employee Salaries</h2>
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Salary ($)</th>
              <th className="text-left px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={emp.salary}
                    onChange={(e) => handleSalaryChange(emp.id, e.target.value)}
                    className="border px-3 py-1 rounded w-32"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleSave(emp.id)}
                    className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryPage;


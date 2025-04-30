import React from "react";
import { useNavigate } from "react-router-dom";

const employees = [
  { name: "John Doe", email: "john.doe@example.com", role: "Administrator" },
  { name: "Jane Smith", email: "jane.smith@example.co", role: "Employee" },
  { name: "Mjchoen Johnson", email: "mjohnson@example.co", role: "Administrator" },
  { name: "Emily Brown", email: "ebrown@example.com", role: "Employee" },
];

const EmployeeManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employee Management</h2>
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
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="px-4 py-1 bg-gray-200 rounded">Edit</button>
                  <button className="px-4 py-1 bg-red-400 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;

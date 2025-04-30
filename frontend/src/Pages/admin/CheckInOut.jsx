import React, { useState } from "react";

const CheckInOut = () => {
  // Example user data
  const initialUsers = [
    { id: 1, name: "John Doe", status: "Checked out" },
    { id: 2, name: "Jane Smith", status: "Checked in" },
    { id: 3, name: "Samuel Adams", status: "Checked out" },
  ];

  const [users, setUsers] = useState(initialUsers);

  const handleCheckInOut = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Checked in" ? "Checked out" : "Checked in" }
          : user
      )
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">User Check-in/Out</h1>
      <table className="min-w-full bg-white rounded-xl shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-6 py-3">{user.name}</td>
              <td className="px-6 py-3">{user.status}</td>
              <td className="px-6 py-3">
                <button
                  onClick={() => handleCheckInOut(user.id)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  {user.status === "Checked in" ? "Check out" : "Check in"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckInOut;

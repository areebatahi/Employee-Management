import React from "react";
import { FaUsers, FaClipboardList, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const cards = [
    { title: "Employees", desc: "Manage employees", icon: <FaUsers />, link: "/admin/employees" },
    { title: "Leave Requests", desc: "Approve or reject leaves", icon: <FaClipboardList />, link: "/admin/leaves" },
    { title: "Salary", desc: "Manage pay", icon: <FaMoneyBillWave />, link: "/admin/salary" },
    { title: "User Check-in/Out", desc: "Track user attendance", icon: <FaCheckCircle />, link: "/admin/checkInOut" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map(({ title, desc, icon, link }) => (
          <Link
            to={link}
            key={title}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl text-blue-600 mb-3 mx-auto">{icon}</div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

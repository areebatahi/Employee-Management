import React from "react";

const UserSalaryPage = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-200 max-w-sm w-full text-center">
        <div className="text-teal-600 text-5xl mb-4">💰</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Salary</h2>
        <p className="text-3xl font-bold text-teal-700">$90,000</p>
        <span className="text-sm text-gray-500 mt-2 block">Monthly Income</span>
      </div>
    </div>
  );
};

export default UserSalaryPage;

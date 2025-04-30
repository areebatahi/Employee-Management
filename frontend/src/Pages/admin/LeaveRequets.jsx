import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveRequests = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4">Leave Requests</h2>
          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ← Back to Dashboard
          </button>
        </div>
        <p className="text-gray-600">Component coming soon – this page will list all leave requests for approval or rejection.</p>
      </div>
    </>
  );
};

export default LeaveRequests;

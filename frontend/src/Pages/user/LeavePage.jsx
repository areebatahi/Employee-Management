import React, { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const LeavePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [employeeName, setEmployeeName] = useState(localStorage.getItem("username") || "");
  const [leaveType, setLeaveType] = useState("Sick");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchLeaves = async () => {
    try {
      const res = await fetch(`${apiUrl}/leaves/applications?employeeName=${employeeName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        throw new Error("Server error or invalid response format");
      }

      const data = await res.json();
      const updatedLeaves = data.leaves || [];
      setLeaveApplications(updatedLeaves);
      localStorage.setItem("leaveApplications", JSON.stringify(updatedLeaves));
    } catch (err) {
      console.error("Error fetching leaves:", err);
      setStatusMessage("❌ Could not fetch leave applications.");
    }
  };

  useEffect(() => {
    const cachedLeaves = localStorage.getItem("leaveApplications");
    if (cachedLeaves) {
      setLeaveApplications(JSON.parse(cachedLeaves));
    }

    if (employeeName) {
      fetchLeaves();
    }
  }, [employeeName]);

  const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return Math.max(1, Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      setStatusMessage("❌ Please provide a reason for the leave.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setStatusMessage("❌ End date must be after start date.");
      return;
    }

    const newLeave = {
      leaveType,
      startDate,
      endDate,
      reason,
      employeeName,
    };

    try {
      const response = await fetch(`${apiUrl}/leaves/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newLeave),
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType?.includes("application/json")) {
        throw new Error("Invalid server response");
      }

      const data = await response.json();

      if (data.success) {
        const updatedList = [...leaveApplications, data.leave];
        setLeaveApplications(updatedList);
        localStorage.setItem("leaveApplications", JSON.stringify(updatedList));
        setStatusMessage("✅ Leave request submitted successfully");
        setShowForm(false);
        setLeaveType("Sick");
        setStartDate("");
        setEndDate("");
        setReason("");
      } else {
        setStatusMessage(`❌ ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting leave:", error);
      setStatusMessage("❌ Failed to apply for leave.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-800">Leave Status</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
        >
          Apply for Leave
        </button>
      </div>

      {statusMessage && (
        <div className="mt-4 text-center font-medium text-sm text-red-600">{statusMessage}</div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Leave Application</h3>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">Leave Type</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="Sick">Sick</option>
                <option value="Casual">Casual</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className={`w-full border-2 ${
                  reason.trim() ? "border-gray-300" : "border-red-500"
                } rounded-lg px-4 py-2`}
                placeholder="Please provide a reason for the leave"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {leaveApplications.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Leave Applications</h3>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-3 text-left">Leave Type</th>
                <th className="border px-4 py-3 text-left">Start Date</th>
                <th className="border px-4 py-3 text-left">End Date</th>
                <th className="border px-4 py-3 text-left">Days</th>
                <th className="border px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveApplications.map((leave) => (
                <tr key={leave._id} className="bg-white hover:bg-gray-50 transition duration-300">
                  <td className="border px-4 py-3">{leave.leaveType}</td>
                  <td className="border px-4 py-3">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-3">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-3">
                    {calculateDays(leave.startDate, leave.endDate)}
                  </td>
                  <td className="border px-4 py-3 text-yellow-600">
                    {leave.status || "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeavePage;

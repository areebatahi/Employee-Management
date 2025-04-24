import { useState } from "react";

const LeavePage = () => {
  const [leaveStatus, setLeaveStatus] = useState("Pending"); // could be "Approved", "Rejected"
  const [showForm, setShowForm] = useState(false);
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveDays, setLeaveDays] = useState(1);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [employeeName, setEmployeeName] = useState("");

  const handleApplyLeave = () => {
    setShowForm(true);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setLeaveDate(selectedDate);
    const startDate = new Date(selectedDate);
    const endDate = new Date(); // You can change this logic if you want a different end date calculation
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    setLeaveDays(diffDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeaveApplication = {
      name: employeeName,
      reason: leaveReason,
      date: leaveDate,
      days: leaveDays,
      status: leaveStatus,  // Adding status to each application
    };
    setLeaveApplications([...leaveApplications, newLeaveApplication]);
    setLeaveStatus("Pending");
    setShowForm(false);
    setLeaveReason("");
    setLeaveDate("");
    setLeaveDays(1);
    setEmployeeName("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex justify-between">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Leave Status</h2>
        <button
          onClick={handleApplyLeave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Apply for Leave
        </button>
      </div>

      {/* Leave Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Leave Application</h3>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">Employee Name</label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">Leave Reason</label>
              <textarea
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                required
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g. Sick leave, Personal work..."
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">Leave Date</label>
              <input
                type="date"
                value={leaveDate}
                onChange={handleDateChange}
                required
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">Number of Days</label>
              <input
                type="number"
                value={leaveDays}
                required
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leave Applications Display like Attendance Sheet */}
      {leaveApplications.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Leave Applications</h3>

          {/* Table for displaying leave data */}
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border px-4 py-3 text-left font-medium">Employee Name</th>
                <th className="border px-4 py-3 text-left font-medium">Leave Date</th>
                <th className="border px-4 py-3 text-left font-medium">Leave Reason</th>
                <th className="border px-4 py-3 text-left font-medium">Number of Days</th>
                <th className="border px-4 py-3 text-left font-medium">Leave Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveApplications.map((application, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50 transition duration-300">
                  <td className="border px-4 py-3">{application.name}</td>
                  <td className="border px-4 py-3">{application.date}</td>
                  <td className="border px-4 py-3">{application.reason}</td>
                  <td className="border px-4 py-3">{application.days}</td>
                  <td className="border px-4 py-3">{application.status}</td>
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

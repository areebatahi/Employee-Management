import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const UserCheckInOut = () => {
  const [time, setTime] = useState(new Date());
  const [employeeName, setEmployeeName] = useState('');
  const [status, setStatus] = useState('Not Checked In');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const storedCheckIn = localStorage.getItem('checkInTime');
    const storedCheckOut = localStorage.getItem('checkOutTime');

    if (storedName) {
      setEmployeeName(storedName);
      fetchHistory(storedName);
    }
    if (storedCheckIn && !storedCheckOut) {
      setIsCheckedIn(true);
      setCheckInTime(storedCheckIn);
      setStatus("Checked In");
    }
    if (storedCheckOut) {
      setCheckOutTime(storedCheckOut);
      setIsCheckedIn(false);
      setStatus("Checked Out");
    }
  }, []);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const handleCheckIn = async () => {
    if (!employeeName.trim()) {
      alert("Please enter your name.");
      return;
    }

    const currentCheckInTime = new Date().toISOString();

    try {
      await axios.post(`${apiUrl}/checkin`, {
        employeeName,
        checkInTime: currentCheckInTime,
      });

      localStorage.setItem('employeeName', employeeName);
      localStorage.setItem('checkInTime', currentCheckInTime);

      setCheckInTime(currentCheckInTime);
      setStatus("Checked In");
      setIsCheckedIn(true);
      fetchHistory(employeeName);
    } catch (err) {
      console.error('Check-in error:', err);
    }
  };

  const handleCheckOut = async () => {
    const currentCheckOutTime = new Date().toISOString();
    const storedName = localStorage.getItem('employeeName');

    if (!storedName) {
      alert("Please enter your name to check out.");
      return;
    }

    try {
      await axios.post(`${apiUrl}/checkout`, {
        employeeName: storedName,
        checkOutTime: currentCheckOutTime,
      });

      localStorage.setItem('checkOutTime', currentCheckOutTime);

      setCheckOutTime(currentCheckOutTime);
      setStatus("Checked Out");
      setIsCheckedIn(false);
      fetchHistory(storedName);
    } catch (err) {
      console.error('Check-out error:', err);
    }
  };

  const fetchHistory = async (name) => {
    try {
      const res = await axios.get(`${apiUrl}/history?employeeName=${name}`);
      if (res.data) {
        setHistory(res.data);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleCheck = () => {
    if (!employeeName.trim()) {
      alert("Please enter your name.");
      return;
    }
    isCheckedIn ? handleCheckOut() : handleCheckIn();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-semibold text-center md:text-left">Check-In / Check-Out</h2>
          <p className="text-2xl font-mono text-gray-700 mt-2 md:mt-0">{formatTime(time)}</p>
        </div>

        {/* Form Area */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="w-full md:w-2/3">
            <label className="block mb-1 font-medium text-gray-600">Employee Name</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="w-full md:w-1/3">
            <button
              onClick={handleCheck}
              className={`w-full px-6 py-2 rounded text-white mt-2 md:mt-0 ${
                isCheckedIn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700 cursor-pointer"
              }`}
            >
              {isCheckedIn ? "Check Out" : "Check In"}
            </button>
          </div>
        </div>

        {/* Status */}
        {status !== 'Not Checked In' && (
          <div className={`text-center font-medium ${isCheckedIn ? "text-green-600" : "text-red-600"}`}>
            {status === "Checked In"
              ? `Checked in at ${formatDateTime(checkInTime)}`
              : `Checked out at ${formatDateTime(checkOutTime)}`}
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Check-In History</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm border">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2 border">Check-In</th>
                    <th className="px-4 py-2 border">Check-Out</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2">{formatDateTime(entry.checkInTime)}</td>
                      <td className="px-4 py-2">
                        {entry.checkOutTime ? formatDateTime(entry.checkOutTime) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCheckInOut;

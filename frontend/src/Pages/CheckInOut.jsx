import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;  // Ensure this is defined in your .env file

const CheckInOut = () => {
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
    return date.toLocaleString(); // Format: "MM/DD/YYYY, HH:MM:SS AM/PM"
  };

  const handleCheckIn = async () => {
    if (!employeeName.trim()) {
      alert("Please enter your name.");
      return;
    }

    const currentCheckInTime = new Date().toISOString();

    try {
      const res = await axios.post(`${apiUrl}/checkin`, {
        employeeName,  // Send employee name to backend
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
      const res = await axios.post(`${apiUrl}/checkout`, {
        employeeName: storedName,  // Send employee name to backend
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
    if (isCheckedIn) {
      handleCheckOut();
    } else {
      handleCheckIn();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Check-In / Check-Out</h2>
        <p className="text-4xl font-bold mb-6">{formatTime(time)}</p>

        <input
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-2 border rounded-md mb-4"
        />

        {status !== 'Not Checked In' && (
          <p className={`mb-2 font-medium ${isCheckedIn ? "text-green-600" : "text-red-600"}`}>
            {status === "Checked In" ? `You checked in at ${formatDateTime(checkInTime)}` : `You checked out at ${formatDateTime(checkOutTime)}`}
          </p>
        )}

        <button
          onClick={handleCheck}
          className={`w-full px-6 py-2 rounded text-white transition ${isCheckedIn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
        >
          {isCheckedIn ? "Check Out" : "Check In"}
        </button>
      </div>
    </div>
  );
};

export default CheckInOut;

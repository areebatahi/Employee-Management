import { useState, useEffect } from 'react';

const CheckInOut = () => {
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState(null); // null | "checkedIn" | "checkedOut"

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCheck = () => {
    if (status === "checkedIn") {
      setStatus("checkedOut");
    } else {
      setStatus("checkedIn");
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

        {status && (
          <p className={`mb-4 font-medium ${status === "checkedIn" ? "text-green-600" : "text-red-600"}`}>
            You have {status === "checkedIn" ? "checked in" : "checked out"}
          </p>
        )}

        <button
          onClick={handleCheck}
          className={`px-6 py-2 rounded text-white transition ${
            status === "checkedIn" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {status === "checkedIn" ? "Check Out" : "Check In"}
        </button>
      </div>
    </div>
  );
};

export default CheckInOut;

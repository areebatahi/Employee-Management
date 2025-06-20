import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState("Not Checked In");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [salary, setSalary] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/auth/user/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          setSalary(data.user.salary);
          localStorage.setItem("employeeName", data.user.name);
        } else navigate("/");
      } catch (error) {
        console.error("Fetch error:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();

    const storedCheckIn = localStorage.getItem("checkInTime");
    const storedCheckOut = localStorage.getItem("checkOutTime");

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
  }, [navigate]);

  const handleCheck = async () => {
    const now = new Date().toISOString();
    try {
      if (isCheckedIn) {
        await axios.post(`${apiUrl}/checkout`, {
          employeeName: user.name,
          checkOutTime: now,
        });
        localStorage.setItem("checkOutTime", now);
        setCheckOutTime(now);
        setStatus("Checked Out");
        setIsCheckedIn(false);
      } else {
        await axios.post(`${apiUrl}/checkin`, {
          employeeName: user.name,
          checkInTime: now,
        });
        localStorage.setItem("checkInTime", now);
        setCheckInTime(now);
        setStatus("Checked In");
        setIsCheckedIn(true);
      }
    } catch (err) {
      console.error("Check-in/out error:", err);
    }
  };

  const formatTime = (date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatDateTime = (dateTime) => new Date(dateTime).toLocaleString();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-screen-xl mx-auto w-full">
        <header className="mb-12">
          <h1 className="text-4xl font-semibold">Welcome, {user?.firstName}</h1>
          <p className="text-sm text-gray-400">Your professional dashboard overview</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-lg p-8 h-64 flex flex-col justify-between w-full">
            <div>
              <h2 className="text-xl font-medium mb-2">Current Time</h2>
              <p className="text-4xl font-mono text-blue-400">{formatTime(time)}</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-lg p-8 h-64 flex flex-col justify-between w-full">
            <div>
              <h2 className="text-xl font-medium mb-2">Status</h2>
              <p className={`text-sm ${isCheckedIn ? "text-green-400" : "text-red-400"}`}>
                {status !== "Not Checked In"
                  ? isCheckedIn
                    ? `Checked in at ${formatDateTime(checkInTime)}`
                    : `Checked out at ${formatDateTime(checkOutTime)}`
                  : "Not yet checked in"}
              </p>
            </div>
            <button
              onClick={handleCheck}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {isCheckedIn ? "Check Out" : "Check In"}
            </button>
          </div>

          <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-lg p-8 h-64 flex flex-col justify-between w-full">
            <div>
              <h2 className="text-xl font-medium mb-2">Leave</h2>
              <p className="text-sm mb-3">Leave status: <span className="font-semibold text-yellow-400">Pending</span></p>
            </div>
            <button
              onClick={() => navigate("/leaves")}
              className="w-full py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-600 transition"
            >
              Apply for Leave
            </button>
          </div>

          <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-lg p-8 h-64 flex flex-col justify-between w-full">
            <div>
              <h2 className="text-xl font-medium mb-2">Monthly Salary</h2>
              <p className="text-3xl font-bold text-white">
                {salary ? `$${salary}` : "..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
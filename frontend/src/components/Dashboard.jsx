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
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/auth/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          localStorage.setItem("employeeName", data.user.name); // save for checkin/out
          setSalary(data.user.salary); // Dynamically setting the salary
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
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

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  const handleCheckIn = async () => {
    const currentCheckInTime = new Date().toISOString();

    try {
      await axios.post(`${apiUrl}/checkin`, {
        employeeName: user.name,
        checkInTime: currentCheckInTime,
      });

      localStorage.setItem("checkInTime", currentCheckInTime);
      setCheckInTime(currentCheckInTime);
      setStatus("Checked In");
      setIsCheckedIn(true);
    } catch (err) {
      console.error("Check-in error:", err);
    }
  };

  const handleCheckOut = async () => {
    const currentCheckOutTime = new Date().toISOString();

    try {
      await axios.post(`${apiUrl}/checkout`, {
        employeeName: user.name,
        checkOutTime: currentCheckOutTime,
      });

      localStorage.setItem("checkOutTime", currentCheckOutTime);
      setCheckOutTime(currentCheckOutTime);
      setStatus("Checked Out");
      setIsCheckedIn(false);
    } catch (err) {
      console.error("Check-out error:", err);
    }
  };

  const handleCheck = () => {
    if (!user?.name) {
      alert("Please login again.");
      return;
    }
    if (isCheckedIn) {
      handleCheckOut();
    } else {
      handleCheckIn();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-semibold mb-8">Employee Management Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Check-In / Check-Out */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-4">Check-In / Check-Out</h3>
          <p className="text-4xl font-bold mb-4">{formatTime(time)}</p>

          {status !== "Not Checked In" && (
            <p className={`mb-2 font-medium ${isCheckedIn ? "text-green-600" : "text-red-600"}`}>
              {status === "Checked In"
                ? `You checked in at ${formatDateTime(checkInTime)}`
                : `You checked out at ${formatDateTime(checkOutTime)}`}
            </p>
          )}

          <button
            onClick={handleCheck}
            className={`w-full px-6 py-2 mt-2 rounded text-white transition ${isCheckedIn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            {isCheckedIn ? "Check Out" : "Check In"}
          </button>
        </div>

        {/* Leave Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Leave Status</h3>
          <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm mb-4">
            Pending
          </span>
          <br />
          <button
            onClick={() => navigate("/leaves")}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Apply for Leave
          </button>
        </div>

        {/* Profile Summary */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          {/* Display Profile Picture */}
          <div className="w-16 h-16 rounded-full overflow-hidden">
            {user?.profilePicture ? (
              <img
                src={user?.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex justify-center items-center">
                <span className="text-xl text-white">{user?.name?.charAt(0)}</span> {/* Safely access first letter of the name */}
              </div>
            )}
          </div>

          {/* Display Full Name and Email */}
          <div>
            <p className="font-semibold">{user?.firstName} {user?.lastName}</p> {/* Add null check for user */}
            <p className="text-sm text-gray-500">{user?.email}</p> {/* Add null check for email */}
          </div>
        </div>

       {/* Salary */}
<div className="bg-white p-6 rounded-lg shadow">
  <h3 className="text-lg font-semibold mb-2">Salary</h3>
  <p className="text-3xl font-bold text-gray-800">{salary ? `$${salary}` : "Loading..."}</p>
</div>

      </div>
    </div>
  );
};

export default Dashboard;

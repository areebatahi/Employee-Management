import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

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
          setUser(data.user); // Ensure `firstName` and `lastName` are part of `data.user`
        } else {
          toast.error(data.message || "Failed to fetch user details");
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching user details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/auth/user/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("User deleted successfully");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/signup");
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">No user data available</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Card Header */}
        <div className="bg-gray-800 text-white p-6 flex justify-between items-center">
          <p className="text-gray-300">Welcome back, {user.firstName} {user.lastName}!</p>
          <div className="flex gap-4">
            <FontAwesomeIcon
              icon={faUserPen}
              className="h-6 w-6 hover:text-[#4bf6d4] cursor-pointer"
              onClick={() => navigate("/update")}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="h-6 w-6 hover:text-[#f87171] cursor-pointer"
              onClick={() => deleteUser(user._id)}
            />
          </div>
        </div>

        {/* Profile Image */}
        {user.profileImage && (
          <div className="flex justify-center p-4">
            <img
              src={user.profileImage}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border-4 border-gray-300 shadow"
            />
          </div>
        )}

        {/* Card Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">{user.firstName} {user.lastName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">{user.email}</p>
          </div>

          {user.gender && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <p className="mt-1 p-2 bg-gray-50 rounded-md capitalize">{user.gender}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Joined On</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-gray-50 p-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-md transition-all duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

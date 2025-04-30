import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Sidebar from './components/Sidebar';

// ---------------- Authentication ------------------
import SignUp from './Pages/authentication/Signup';
import LoginPage from './Pages/authentication/LoginPage';
import Logout from "./Pages/authentication/Logout";
import Update from './Pages/authentication/Update';

// ------------------- user --------------------------
import Dashboard from './components/Dashboard';
import UserCheckInOut from './Pages/user/UserCheckInOut'
import LeavePage from './Pages/user/LeavePage';
import UserSalaryPage from './Pages/user/UserSalaryPage';
import Profile from "./Pages/user/Profile";

// -------------------- Admin Setup ---------------------
import AdminDashboard from './components/AdminDashboard';
import EmployeeManagement from './Pages/admin/EmployeeManagement';
import LeaveRequests from './Pages/admin/LeaveRequets';
import SalaryPage from './Pages/admin/SalaryPage';
import CheckInOut from './Pages/admin/CheckInOut';

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin'); // ✅ Updated check

  return (
    <>
      {!isAdminRoute && ( // ✅ Sidebar only for user side
        <Sidebar />
      )}

      <div className={`${!isAdminRoute ? "ml-64" : ""} flex-1 min-h-screen bg-gray-50 p-4`}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          {/* ---------- User Routes ---------- */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userCheckInOut" element={<UserCheckInOut />} />
          <Route path="/leaves" element={<LeavePage />} />
          <Route path="/salary" element={<UserSalaryPage />} />
          <Route path="/profile" element={<Profile />} />

          {/* ---------- Auth Routes ---------- */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/update" element={<Update />} />
          <Route path="/logout" element={<Logout />} />

          {/* ---------- Admin Routes ---------- */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<EmployeeManagement />} />
          <Route path="/admin/leaves" element={<LeaveRequests />} />
          <Route path="/admin/salary" element={<SalaryPage />} />
          <Route path="/admin/checkInOut" element={<CheckInOut />} />
        </Routes>
      </div>
    </>
  );
};
export default App
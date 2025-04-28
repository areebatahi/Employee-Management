import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/Signup';
import Logout from "./Pages/Logout";
import Profile from "./Pages/Profile";
import Update from './Pages/Update';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CheckInOut from './Pages/CheckInOut';
import LeavePage from './Pages/LeavePage';
import SalaryPage from './Pages/SalaryPage';

const App = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 min-h-screen bg-gray-50 p-4">
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkInOut" element={<CheckInOut />} />
          <Route path="/leaves" element={<LeavePage />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

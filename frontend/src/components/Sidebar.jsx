import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCalendarCheck,
  faSignOutAlt,
  faUser,
  faMoneyBill,
  faClipboardList,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const showSidebar =
    isAuthenticated || location.pathname === "/" || location.pathname === "/signup";

  const authNavItems = !isAuthenticated
  ? [
    { to: "/signup", icon: faUserPlus, text: "Sign Up" },
    { to: "/", icon: faSignInAlt, text: "Login" },
  ]
  : [
      { to: "/dashboard", icon: faTachometerAlt, text: "Dashboard" },
      { to: "/userCheckInOut", icon: faCalendarCheck, text: "Check-In/Out" },
      { to: "/leaves", icon: faClipboardList, text: "Leaves" },
      { to: "/profile", icon: faUser, text: "Profile" },
      { to: "/salary", icon: faMoneyBill, text: "Salary" },
      { to: "/logout", icon: faSignOutAlt, text: "Logout" },
    ];

  if (!showSidebar) return null;

  return (
    <div className="w-64 h-screen bg-black shadow-lg fixed top-0 left-0 flex flex-col text-white z-50">
      <div className="p-6 font-bold text-xl border-b border-gray-200">
        Employee Management
      </div>
      <nav className="flex-1 p-4 space-y-4">
        {authNavItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center p-3 rounded-lg transition duration-300 ${
              location.pathname === item.to
                ? "text-black bg-[#F7F7F7] font-semibold"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={item.icon} className="mr-3" />
            {item.text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

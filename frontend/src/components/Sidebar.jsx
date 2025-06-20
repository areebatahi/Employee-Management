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
    <div className="w-64 h-screen fixed top-0 left-0 z-50 bg-gradient-to-b from-[#1f1f2e] to-[#141418] shadow-2xl flex flex-col text-white">
      {/* Brand/Header */}
      <div className="p-6 font-bold text-2xl tracking-wide text-center border-b border-gray-700 bg-[#1f1f2e]">
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          EMS Portal
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-2">
        {authNavItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 p-3 rounded-lg text-sm transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
                  : "hover:bg-white/10 text-gray-300"
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-white" : "text-purple-400"
                }`}
              />
              {item.text}
            </Link>
          );
        })}
      </nav>

      {/* Footer if needed */}
      <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-700">
        &copy; {new Date().getFullYear()} EMS Inc.
      </div>
    </div>
  );
};

export default Sidebar;

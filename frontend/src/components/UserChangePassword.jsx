import React, { useState } from "react";
import { FaBars, FaHome, FaListUl } from "react-icons/fa";

const UserChangePassword = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="relative w-64 bg-white border-r-2 border-black">
        <div className="flex justify-between items-center px-4 py-6">
          <h2 className="text-2xl font-bold text-black">HealthCare</h2>
          <FaBars
            className="text-blue-500 text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        {menuOpen && (
          <ul className="mt-4">
            <li className="flex items-center space-x-2 py-4 px-6 hover:bg-gray-200 cursor-pointer">
              <FaHome className="text-blue-500" />
              <span className="text-black text-left">Dashboard</span>
            </li>
            <hr className="border-black" />
            <li className="flex items-center space-x-2 py-4 px-6 hover:bg-gray-200 cursor-pointer">
              <FaListUl className="text-blue-500" />
              <span className="text-black text-left">Medical History</span>
            </li>
          </ul>
        )}
      </div>
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b shadow-md py-4 px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">
            Medical Center University of Vavuniya
          </h1>
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={toggleProfileMenu}
            >
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">&nbsp;</span> {/* Space for name */}
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black text-white shadow-md rounded-md z-50">
                <ul className="text-left">
                  <li
                    className="py-2 px-4 hover:bg-gray-700 cursor-pointer"
                    onClick={() => alert("My Profile")}
                  >
                    My Profile
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-700 cursor-pointer"
                    onClick={() => alert("Change Password")}
                  >
                    Change Password
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-700 cursor-pointer"
                    onClick={() => alert("Log Out")}
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default UserChangePassword;

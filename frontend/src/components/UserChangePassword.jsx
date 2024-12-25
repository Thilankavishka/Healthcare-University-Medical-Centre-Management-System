import React, { useState } from "react";
import { FaBars, FaHome, FaListUl } from "react-icons/fa";

const UserChangePassword = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
    </div>
  );
};

export default UserChangePassword;

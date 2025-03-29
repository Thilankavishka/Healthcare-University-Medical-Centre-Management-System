import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserChangePassword = () => {
  const [formData, setFormData] = useState({
    regnum: "", 
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-purple-50">
    
      <div className="w-1/4 bg-gradient-to-b from-blue-600 to-purple-600 p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Medical Center University of Vavuniya
          </h1>
          <p className="text-sm text-white mt-2">
            Secure and Reliable Healthcare Services
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate("/patientdashboard")}
            className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      
      <div className="w-3/4 p-8">
       
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            User | Change Password
          </h1>
          <hr className="mt-2 border-t-2 border-gray-200" />
        </div>
        {/* Form Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Registration and Current Password */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Account Information
            </h2>
            <form className="space-y-4">
              {/* Reg Num Field */}
              <div>
                <label
                  htmlFor="regnum"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="regnum"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter your registration number"
                  value={formData.regnum}
                  onChange={handleChange}
                />
              </div>

              {/* Current Password Field */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter your current password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>

          {/* Section 2: New Password and Confirm Password */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              New Password
            </h2>
            <form className="space-y-4">
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChangePassword;


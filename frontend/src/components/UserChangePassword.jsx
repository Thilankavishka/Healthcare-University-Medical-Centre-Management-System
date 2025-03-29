import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/changepassword/change-password",
        formData
      );
      alert(response.data.message);
      navigate("/logout");
    } catch (error) {
      alert(error.response?.data?.message || "Error changing password");
    }
  };

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Account Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
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

          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              New Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
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
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChangePassword;


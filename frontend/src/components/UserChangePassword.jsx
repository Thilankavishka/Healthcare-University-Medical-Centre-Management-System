import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserChangePassword = () => {
  const [formData, setFormData] = useState({
    regnum: "", 
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
      </div>
    </div>
  );
};

export default UserChangePassword;


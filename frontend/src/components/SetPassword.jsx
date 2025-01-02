import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const SetPassword = () => {
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 bg-white shadow-md rounded-lg text-left">
        <h1 className="text-2xl font-bold mb-6">Set New Password</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div className="relative">
            <input
              type="password"
              placeholder="New Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="py-1 px-4 text-sm bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;

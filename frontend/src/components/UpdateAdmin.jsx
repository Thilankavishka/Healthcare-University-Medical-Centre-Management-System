import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdateAdmin() {  
  const navigate = useNavigate();
  const location = useLocation();
  const adminData = location.state || {}; // Get passed admin data

  // Initialize state with existing admin data
  const [username, setUsername] = useState(adminData.username || "");
  const [gender, setGender] = useState(adminData.gender || "");
  const [admintype, setAdminType] = useState(adminData.admintype || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords match if a new password is provided
    if (password && password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Prepare the update payload
      const updateData = {
        username,
        gender,
        admintype,
      };

      // Only include password if a new one is provided
      if (password) {
        updateData.password = password;
      }

      const response = await axios.put(
        `http://localhost:8080/auth/updateAdmin/${username}`,
        updateData
      );

      if (response.status === 200) {
        setSuccessMessage("Admin updated successfully!");
        setErrorMessage("");
        setTimeout(() => navigate("/superadmindashboard"), 2000); // Changed to navigate to admindashboard
      }
    } catch (error) {
      setErrorMessage("Error updating admin. Please try again.");
      setSuccessMessage("");
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-purple-50">
        {/* Sidebar */}
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
              onClick={() => navigate("/superadmindashboard")} // Changed to admindashboard
              className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-8">
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Update Doctor/Admin
            </h1>
            <hr className="mt-2 border-t-2 border-gray-200" />
          </div>

          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {successMessage && (
              <div className="mb-6 text-green-600 text-center text-lg">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 text-red-500 text-center text-lg">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  value={username}
                  disabled
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Gender
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Admin Type */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Admin Type
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={admintype}
                  onChange={(e) => setAdminType(e.target.value)}
                  required
                >
                  <option value="">Select Admin Type</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  New Password (Leave empty to keep old password)
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password (only shown if password is being changed) */}
              {password && (
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}

              {/* Update Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  Update Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
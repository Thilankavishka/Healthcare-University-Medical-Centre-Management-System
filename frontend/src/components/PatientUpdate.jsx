import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdatePatient() {  
  const navigate = useNavigate();
  const location = useLocation();
  const patientData = location.state || {}; // Get passed patient data

  // Initialize state with existing patient data
  const [formData, setFormData] = useState({
    regnum: patientData.regnum || "",
    fullname: patientData.fullname || "",
    email: patientData.email || "",
    address: patientData.address || "",
    city: patientData.city || "",
    course: patientData.course || "",
    department: patientData.department || "",
    faculty: patientData.faculty || "",
    bloodgroup: patientData.bloodgroup || "",
    gender: patientData.gender || "",
    password: "",
    image: patientData.image || ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/patient/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setFormData(prev => ({
        ...prev,
        image: response.data.filePath
      }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:8080/patient/updatepatient/${formData.regnum}`,
        formData
      );

      if (response.data.success) {
        toast.success('Patient details updated successfully!');
        setTimeout(() => navigate("/superadmindashboard"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating patient');
    } finally {
      setLoading(false);
    }
  };

  return (
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
            onClick={() => navigate("/admindashboard")}
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
            Update Patient Details
          </h1>
          <hr className="mt-2 border-t-2 border-gray-200" />
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Registration Number */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  value={formData.regnum}
                  readOnly
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Course */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Faculty */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Faculty
                </label>
                <input
                  type="text"
                  name="faculty"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Blood Group
                </label>
                <select
                  name="bloodgroup"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.bloodgroup}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  New Password (Leave empty to keep old password)
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleImageUpload}
                  disabled={loading}
                />
                {/* {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={formData.image} 
                      alt="Profile" 
                      className="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
                    />
                  </div>
                )} */}
              </div>
            </div>

            {/* Update Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Patient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddAppointment() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract patient details from state
  const { regnum, fullname, email } = location.state || {};

  // Form state
  const [appointmentData, setAppointmentData] = useState({
    regnum: regnum || "", // Pre-fill with patient data
    fullname: fullname || "",
    email: email || "",
    date: "", // This field is not pre-filled
    time: "",
    condition: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/Appointments/Appointments",
        appointmentData
      );
      if (response.data.success) {
        alert("Appointment booked successfully!");
        navigate("/dashboard"); // Redirect after successful submission
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment.");
    }
  };


  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString(); // Months are 0-indexed
    let day = currentDate.getDate().toString();

    month = month.length === 1 ? "0" + month : month;
    day = day.length === 1 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add Appointment
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Registration Number */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Patient Registration Number
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="regnum"
              value={appointmentData.regnum}
              readOnly
            />
          </div>

          {/* Patient Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Patient Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="fullname"
              value={appointmentData.fullname}
              readOnly
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              value={appointmentData.email}
              readOnly
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Date
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              name="date"
              min={getCurrentDate()}
              value={appointmentData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Time
            </label>
            <input
              type="time"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="time"
              value={appointmentData.time}
              onChange={handleChange}
              required
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Condition
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="condition"
              value={appointmentData.condition}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-around">
          <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Appointment
            </button>
            </div>
        </form>
      </div>
    </div>
  );
}

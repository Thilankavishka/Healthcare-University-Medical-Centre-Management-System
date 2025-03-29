import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddAppointment() {
  const [regno, setRegNo] = useState("");
  const [pname, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [condition, setCondition] = useState("");

  const navigate = useNavigate();

  const allAppointment = async (e) => {
    e.preventDefault();

    const newAppointment = {
      regno,
      pname,
      email,
      date,
      time,
      condition,
    };

    try {
      await axios.post(
        "http://localhost:8080/Appointments/Appointments",
        newAppointment
      );
      alert("Appointment Added Successfully");
      navigate("/AllAppointments"); // Redirect to the appointments page
    } catch (err) {
      alert("Error adding appointment. Please try again.");
      console.error(err);
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
        <form onSubmit={allAppointment} className="space-y-6">
          {/* Registration Number */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Patient Registration Number
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Registration Number"
              value={regno}
              onChange={(e) => setRegNo(e.target.value)}
              required
            />
          </div>

          {/* Patient Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Patient Name
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Patient Name"
              value={pname}
              onChange={(e) => setPatientName(e.target.value)}
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              min={getCurrentDate()}
              onChange={(e) => setDate(e.target.value)}
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
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
              placeholder="Enter Condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

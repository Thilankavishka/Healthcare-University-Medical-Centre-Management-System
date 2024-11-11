import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setRole2 }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/auth/login", { username, password, role })
      .then((res) => {
        if (res.data.login && res.data.role === "admin") {
          setRole2("admin");
          navigate("/admindashboard");
        } else if (res.data.login && res.data.role === "student") {
          setRole2("student");
          navigate("/studentdashboard");
        } else {
          console.log("Invalid role or login status");
        }
      })
      .catch((err) => console.log(err)); // Check for errors
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-semibold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-gray-700 font-semibold mb-2"
          >
            Role:
          </label>
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-200"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}

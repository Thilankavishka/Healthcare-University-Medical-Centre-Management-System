import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

export default function Login({ setRole2 }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Changed from default "superadmin" to empty

  const navigate = useNavigate();

  const toregister = () => {
    navigate("/register");
  };

  const toForgetPassword = () => {
    navigate("/passwordrecovery");
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = () => {
    // Validate inputs
    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please enter both username and password.",
      });
      return;
    }

    if (!role) {
      Swal.fire({
        icon: "error",
        title: "Role Required",
        text: "Please select your role before logging in.",
      });
      return;
    }

    axios
      .post("http://localhost:8080/auth/login", { username, password, role })
      .then((res) => {
        if (res.data.login && res.data.role) {
          sessionStorage.setItem("role", res.data.role);
          sessionStorage.setItem("username", res.data.username);
          setRole2(res.data.role);

          if (res.data.role === "superadmin") {
            navigate("/superadmindashboard");
          } else if (res.data.role === "patient") {
            navigate("/patientdashboard", { state: { regnum: res.data.username } });      
          } else if (res.data.role === "admin") {
            navigate("/admindashboard");
          }

          window.location.reload();
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: res.data.message || "Invalid credentials or role mismatch.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: err.response?.data?.message || "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
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
              Username/RegNum:
            </label>
            <input
              type="text"
              placeholder="2020ICT30"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
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
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Select your role</option>
              <option value="patient">Patient</option>
              <option value="admin">Admin</option>
              <option value="superadmin">SuperAdmin</option>
            </select>
          </div>
          <button
            className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-200"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div className="flex flex-col items-center mt-4">
            <button
              onClick={toForgetPassword}
              className="block mt-4 text-center text-blue-600 hover:text-blue-800 underline"
            >
              Forget Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
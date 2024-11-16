import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function RegisterStudent() {
  const [regnum, setRegnum] = useState();
  const [fullname, setFullName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [course, setCourse] = useState();
  const [department, setDepartment] = useState();
  const [faculty, setFaculty] = useState();
  const [bloodgroup, setBlood] = useState();
  const [gender, setGender] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState("");

  const Navigate = useNavigate();

  const tologin = () => {
    Navigate("/login");
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Upload image
      const formData = new FormData();
      formData.append("image", image[0]); // Use the first file in case of multiple selections

      const uploadRes = await axios.post(
        "http://localhost:8080/patient/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // If image upload is successful, get the file path
      const imagePath = uploadRes.data.filePath;

      // Register patient
      const res = await axios.post(
        "http://localhost:8080/patient/patientregister",
        {
          regnum,
          fullname,
          address,
          city,
          course,
          department,
          faculty,
          bloodgroup,
          gender,
          password,
          image: imagePath,
        }
      );

      if (res.data.registered) {
        setSuccessMessage(res.data.message);
        setErrorMessage("");
        setTimeout(() => Navigate("/login"), 2000);
      }

      console.log(res);
    } catch (err) {
      console.log(err);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Register Patient
          </h2>
          {successMessage && (
            <div className="mb-4 text-green-500 text-sm text-center">
              {successMessage}
            </div>
          )}
          <form onSubmit={handlesubmit} className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex:2020ict01"
                value={regnum}
                onChange={(e) => setRegnum(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex:A.B.C Perera"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Address</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex:123/5 ABC Mawatha Colombo"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">City</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex:Colombo"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Course</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex:IT/BS/BTEC IT/AMC/CS/ENS"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Department</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex:Physical science/Biological science"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Faculty</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex:Applied Science/Business Studies/Technology"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Blood Group</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex:B-/B+"
                value={bloodgroup}
                onChange={(e) => setBlood(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Gender</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">
                Select Profile Photo
              </label>
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files)}
              ></input>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">
                Confirm-Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && (
              <div className="col-span-2 text-red-500 text-sm">
                {errorMessage}
              </div>
            )}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
              >
                Register
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center">
            <button
              onClick={tologin}
              className="block mt-4 text-center text-blue-600 hover:text-blue-800 underline "
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

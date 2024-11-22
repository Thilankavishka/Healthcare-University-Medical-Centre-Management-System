//import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import Logout from "./components/Logout";
import Gallery from "./pages/Gallery";
import RegisterPatient from "./components/RegisterPatient";
import PatientDetails from "./components/PatientDetails";
import Patientdashboard from "./components/Patientdashboard";
import SuperAdmindashboard from "./components/SuperAdmindashboard";
import Admindashboard from "./components/Admindashboard";
import RegisterAdmin from "./components/RegisterAdmin";
import MorePatientDetails from "./components/Morepatientdetails";

function App() {
  const [role, setRole] = useState("");
  const [username, setUserName] = useState(null);

  // Set axios to include credentials globally
  axios.defaults.withCredentials = true;
  useEffect(() => {
    try {
      axios
        .get("http://localhost:8080/auth/verify")
        .then((res) => {
          if (res.data.login) {
            setRole(res.data.role);
            setUserName(res.data.username);
          } else {
            axios
              .get("http://localhost:8080/auth/verifypatient")
              .then((res) => {
                if (res.data.login) {
                  setRole(res.data.role);
                  setUserName(res.data.username);
                } else {
                  setRole("");
                  setUserName(null);
                }
                console.log(res);
              });
          }
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error verifying user:", error);
      setRole("");
      setUserName(null); // Reset state on error
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home role={role} userId={username}></Home>}
          ></Route>
          <Route
            path="/login"
            element={<Login setRole2={setRole}></Login>}
          ></Route>
          <Route
            path="/superadmindashboard"
            element={
              <SuperAdmindashboard username={username}></SuperAdmindashboard>
            }
          ></Route>
          <Route
            path="/logout"
            element={<Logout setRole={setRole}></Logout>}
          ></Route>
          <Route path="/Gallery" element={<Gallery></Gallery>}></Route>
          <Route
            path="/register"
            element={<RegisterPatient></RegisterPatient>}
          ></Route>
          <Route
            path="PatientDetails"
            element={<PatientDetails></PatientDetails>}
          ></Route>
          <Route
            path="/patientdashboard"
            element={<Patientdashboard regnum={username}></Patientdashboard>}
          ></Route>
          <Route
            path="/admindashboard"
            element={<Admindashboard></Admindashboard>}
          ></Route>
          <Route
            path="/registeradmin"
            element={<RegisterAdmin></RegisterAdmin>}
          ></Route>
          <Route
            path="/morepatientdetails"
            element={<MorePatientDetails></MorePatientDetails>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

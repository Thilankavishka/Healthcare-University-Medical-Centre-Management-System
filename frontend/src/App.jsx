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
import AllAppointments from "./components/AllAppointments";
import AddAppointment from "./components/AddAppoinment";
import Patientdashboard from "./components/Patientdashboard";
import SuperAdmindashboard from "./components/SuperAdmindashboard";
import Admindashboard from "./components/Admindashboard";
import RegisterAdmin from "./components/RegisterAdmin";
import MorePatientDetails from "./components/Morepatientdetails";
import PasswordRecovery from "./components/PasswordRecovery";
import AdminDetails from "./components/AdminDetails";
import UserMessage from "./components/UserMessages";
import UserChangePassword from "./components/UserChangePassword";
import SetPassword from "./components/SetPassword";
function App() {
  const [role, setRole] = useState("");
  const [username, setUserName] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    // Function to verify user roles and credentials
    const verifyUser = async () => {
      try {
        let response = await axios.get("http://localhost:8080/auth/verify");
        if (response.data.login) {
          setRole(response.data.role);
          setUserName(response.data.username);
          return;
        }

        response = await axios.get("http://localhost:8080/auth/verifypatient");
        if (response.data.login) {
          setRole(response.data.role);
          setUserName(response.data.username);
          return;
        }

        response = await axios.get("http://localhost:8080/auth/verifyadmin");
        if (response.data.login) {
          setRole(response.data.role);
          setUserName(response.data.username);
          return;
        }

        setRole("");
        setUserName(null);
      } catch (error) {
        console.error("Error verifying user:", error);
        setRole("");
        setUserName(null);
      }
    };

    verifyUser();
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
            path="/patientdetails"
            element={<PatientDetails></PatientDetails>}
          ></Route>
          <Route
            path="/AllAppointments"
            element={<AllAppointments></AllAppointments>}
          ></Route>
          <Route
            path="/AddAppointment"
            element={<AddAppointment></AddAppointment>}
          ></Route>
          <Route
            path="/patientdashboard"
            element={<Patientdashboard regnum={username}></Patientdashboard>}
          ></Route>
          <Route
            path="/admindashboard"
            element={<Admindashboard username={username}></Admindashboard>}
          ></Route>
          <Route
            path="/registeradmin"
            element={<RegisterAdmin></RegisterAdmin>}
          ></Route>
          <Route
            path="/morepatientdetails"
            element={<MorePatientDetails></MorePatientDetails>}
          ></Route>
          <Route
            path="/passwordrecovery"
            element={<PasswordRecovery></PasswordRecovery>}
          ></Route>
          <Route
            path="/admindetails"
            element={<AdminDetails></AdminDetails>}
          ></Route>

          <Route
            path="/usermessages"
            element={<UserMessage></UserMessage>}
          ></Route>
          <Route
            path="/changepassword"
            element={<UserChangePassword></UserChangePassword>}
          ></Route>

          <Route
            path="/setpassword"
            element={<SetPassword></SetPassword>}
          ></Route>

          <Route path="drugs" element={<Drugs userRole={role}></Drugs>}></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;

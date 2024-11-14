//import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import Admindashboard from "./components/Admindashboard";
import Logout from "./components/Logout";
import Gallery from "./pages/Gallery";

function App() {
  const [role, setRole] = useState("");
  const [username, setUserName] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
          setUserName(res.data.username);
        } else {
          setRole("");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
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
            path="/admindashboard"
            element={<Admindashboard username={username}></Admindashboard>}
          ></Route>
          <Route
            path="/logout"
            element={<Logout setRole={setRole}></Logout>}
          ></Route>
          <Route path="/Gallery" element={<Gallery></Gallery>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

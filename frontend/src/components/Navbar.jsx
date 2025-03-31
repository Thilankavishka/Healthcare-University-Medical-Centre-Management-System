import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

export default function Navbar({ role, userId }) {
  const Navigate = useNavigate();
  const goRegister = () => {
    Navigate("/register");
  };

  const goLogin = () => {
    Navigate("/login");
  };

  const GoLogOut = () => {
    Navigate("/logout");
  };

  const SuperGoAdmindDshboard = () => {
    Navigate("/superadmindashboard");
  };

  const GopatientDashboard = () => {
    Navigate("/patientdashboard");
  };

  const Gototadmindashboard = () => {
    Navigate("/admindashboard");
  };

  return (
    <nav className="w-full h-16 flex justify-between items-center px-5 bg-sky-200">
      <div className="logo w-12">
        <Link to={"/"}>
          <img className="ml-10" src="./logo.png" alt=""></img>
        </Link>
      </div>
      <div className="nav-contains w-1/2 text-xl font-sans font-bold ">
        <ul className="flex justify-between">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <Link to={"/Services"}>Services</Link>
          <li>
            <Link to={"/AboutUs"}>About us</Link>
          </li>
          <li>
            <Link to={"/Gallery"}>Gallery</Link>
          </li>
          <li>
            <Link to={"/Help"}>Help</Link>
          </li>
        </ul>
      </div>
      <div className="flex">
        {role === "superadmin" && (
          <>
            <Button onClick={SuperGoAdmindDshboard} className=" mr-3">
              Super Admin Dashboard
            </Button>

            <Button variant="info" className=" mr-3" onClick={GoLogOut}>
              Logout
            </Button>
          </>
        )}
        {role === "patient" && (
          <>
            <Button onClick={GopatientDashboard} className=" mr-3">
              Dashboard
            </Button>{" "}
            <Button variant="info" className=" mr-3" onClick={GoLogOut}>
              Logout
            </Button>
          </>
        )}
        {role === "admin" && (
          <>
            <Button onClick={Gototadmindashboard} className=" mr-3">
              Admin Dashboard
            </Button>
            <Button variant="info" className=" mr-3" onClick={GoLogOut}>
              Logout
            </Button>
          </>
        )}
        {role === "" && (
          <>
            {/*<Button variant="info" className=" mr-3" onClick={goRegister}>
              REGISTER
            </Button>*/}
            <Button variant="dark" onClick={goLogin}>
              LOGIN
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

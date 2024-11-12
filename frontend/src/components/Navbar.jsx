import { useState } from "react";
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

  const GoAdmindDshboard = () => {
    Navigate("/admindashboard");
  };
  return (
    <nav className="w-full h-16 flex justify-between items-center px-5">
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
            <Link to={"/Aboutus"}>About us</Link>
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
        {role === "admin" && (
          <>
            <Button onClick={GoAdmindDshboard} className=" mr-3">
              SuperAdmindDshboard
            </Button>
            <Button variant="info" className=" mr-3" onClick={goRegister}>
              REGISTER
            </Button>
          </>
        )}
        {role === "student" && <></>}
        {role === "doctor" && <></>}
        {role === "" ? (
          <>
            <Button variant="info" className=" mr-3" onClick={goRegister}>
              REGISTER
            </Button>
            <Button variant="dark" onClick={goLogin}>
              LOGIN
            </Button>
          </>
        ) : (
          <>
            <Button variant="info" className=" mr-3" onClick={GoLogOut}>
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

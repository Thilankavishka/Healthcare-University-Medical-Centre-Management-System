import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const Navigate = useNavigate();
  const goRegister = () => {
    Navigate("/register");
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
        <Button variant="info" className=" mr-3" onClick={goRegister}>
          REGISTER
        </Button>
        <div>
          <Button variant="dark" onClick={() => setOpen((show) => !show)}>
            LOGIN
          </Button>
          {open && (
            <div className="bg-[#76dbcf] absolute flex flex-col rounded-xl w-32 mt-3 font-semibold items-center">
              <Link to={"/login"}>Patient</Link>
              <Link to={"/logindoc"}>Doctor</Link>
              <Link to={"/loginadmin"}>Admin</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

import { Link } from "react-router-dom";

export const Navbar = () => {
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
        <button
          className="w-32 h-10 bg-[#76dbcf] rounded-2xl font-semibold mr-3"
          onClick={""}
        >
          REGISTER
        </button>
        <div>
          <button
            className=" realtive w-32 h-10 bg-[#76dbcf] rounded-2xl font-semibold"
            onClick={""}
          >
            LOGIN
          </button>
        </div>
      </div>
    </nav>
  );
};

import Message from "../components/Message";
import { Navbar } from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const currenrtime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  return (
    <>
      {/*Navbar section */}
      <div className="sec-1 w-full h-fit bg-gradient-to-tl from-[#76dbcf]">
        <Navbar></Navbar>
        <div className="hero w-full flex items-center px-10">
          <img className="w-1/2 h-[300px]" src="/uov.jpg" alt=""></img>

          <div className="hero-text w-1/2 flex flex-col items-center ">
            <h1 className="font-semibold text-4xl text-blue-700">HealthCare</h1>
            <h1 className="text-orange-900 font-bold text-5xl">
              University of Vavuniya
            </h1>
            <h1>
              We are here to provide healthcare to everyone in the University
            </h1>
          </div>
        </div>
      </div>
      {/*Time Section */}
      <div className=" bg-red-100  font-25  rounded-lg shadow-lg p-4 ">
        <div className="  mb-2">
          <h1 className=" text-pink-950 flex items-center justify-center h-30 text-4xl font-semibold ">
            Time :{currenrtime}
          </h1>
        </div>
        <div>
          <h1 className="  text-pink-950 flex items-center justify-center h-30 text-4xl font-semibold">
            Date:{currentDate}
          </h1>
        </div>
        <div>
          <h1 className=" text-red-900 flex items-center justify-center h-30 text-4xl font-semibold">
            Open
          </h1>
        </div>
      </div>

      {/*Message Section*/}
      <div className="sec-3 w-full h-fit bg-teal-200  pb-5">
        <div className="department-head flex justify-center">
          <h1 className="text-3xl font-semibold mt-1 p-5">Send Us A Message</h1>
        </div>
        <Message></Message>
      </div>

      {/*Footer*/}
      <div></div>
    </>
  );
}

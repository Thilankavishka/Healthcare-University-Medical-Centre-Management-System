import Navbar from "./Navbar";

export default function Admindashboard() {
  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex flex-col items-center justify-center h-10 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
    </>
  );
}

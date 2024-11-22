import Navbar from "./Navbar";

export default function Patientdashboard({ regnum }) {
  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <h1>Name: {regnum}</h1>
      <h1>patientdashboard</h1>
    </>
  );
}

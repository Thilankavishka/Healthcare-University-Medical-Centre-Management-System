import Navbar from "./Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function SuperAdmindashboard({ username }) {
  const navigate = useNavigate();

  const gopatientdetails = () => {
    navigate("/patientdetails");
  };

  const goAdminregister = () => {
    navigate("/registeradmin");
  };

  const goRegisterPatient = () => {
    navigate("/register");
  };
  const goAdminDetails = () => {
    navigate("/admindetails");
  };

  const goUserMessages = () => {
    navigate("/usermessages");
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center h-20 bg-gray-100 shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Super Admin Dashboard
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-2xl font-semibold text-gray-700">
          Admin Name: <span className="text-blue-600">{username}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 md:px-20">
        <div className="flex items-center justify-center">
          <Card className="w-72 shadow-lg">
            <Card.Img variant="top" src="/card_images/patient.jpg" />
            <Card.Body>
              <Card.Title className="font-bold text-lg text-center">
                Patient Details
              </Card.Title>
              <Card.Text className="text-sm text-gray-500 text-center">
                Click Here to Show Patient Details
              </Card.Text>
              <Button
                variant="primary"
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={gopatientdetails}
              >
                Go Patient Details
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="flex items-center justify-center">
          <Card className="w-72 shadow-lg">
            <Card.Img variant="top" src="/card_images/doctor.jpeg" />
            <Card.Body>
              <Card.Title className="font-bold text-lg text-center">
                Admin Details
              </Card.Title>
              <Card.Text className="text-sm text-gray-500 text-center">
                Click Here to Show Admin/Doctors Details
              </Card.Text>
              <Button
                variant="primary"
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={goAdminDetails}
              >
                Go Doctors Details
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="flex items-center justify-center">
          <Card className="w-72 shadow-lg">
            <Card.Img variant="top" src="/card_images/reg.jpg" />
            <Card.Body>
              <Card.Title className="font-bold text-lg text-center">
                Register Doctors/Admins
              </Card.Title>
              <Card.Text className="text-sm text-gray-500 text-center">
                Click Here to Register Admin
              </Card.Text>
              <Button
                variant="primary"
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={goAdminregister}
              >
                Register Admin
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="flex items-center justify-center">
          <Card className="w-72 shadow-lg">
            <Card.Img variant="top" src="/card_images/register_patient.jpg" />
            <Card.Body>
              <Card.Title className="font-bold text-lg text-center">
                Register Patient
              </Card.Title>
              <Card.Text className="text-sm text-gray-500 text-center">
                Click Here to Register Patient
              </Card.Text>
              <Button
                variant="primary"
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={goRegisterPatient}
              >
                Register Patient
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="flex items-center justify-center">
          <Card className="w-72 shadow-lg">
            <Card.Img variant="top" src="/card_images/register_patient.jpg" />
            <Card.Body>
              <Card.Title className="font-bold text-lg text-center">
                User Messages
              </Card.Title>
              <Card.Text className="text-sm text-gray-500 text-center">
                Click Here to Show User Messages
              </Card.Text>
              <Button
                variant="primary"
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={goUserMessages}
              >
                User Messages
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

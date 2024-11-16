import Navbar from "./Navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Admindashboard({ username }) {
  //const [adminprofile, setadminprofile] = useState("");
  //console.log(adminprofile);

  /*useEffect(() => {
    if (username) {
      
      axios
        .get(`http://localhost:8080/auth/adprofile/${username}`)
        .then((response) => {
          setadminprofile(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [username]);
*/
  const Naviagte = useNavigate();
  const gopatientdetails = () => {
    Naviagte("/patientdetails");
  };
  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex flex-col items-center justify-center h-10 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
      <div className="flex items-center justify-center p-20">
        <p className="text-2xl font-medium text-black-70 ">
          Admin Name:{username}
        </p>
      </div>
      <div className="flex justify-center space-x-4">
        <div className="flex items-center">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Patient Details</Card.Title>
              <Card.Text>Click Here to Show Patient Details</Card.Text>
              <Button variant="primary" onClick={gopatientdetails}>
                Go Patient Details
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="flex items-center">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Doctors Details</Card.Title>
              <Card.Text>Click Here to Show Doctors Details</Card.Text>
              <Button variant="primary">Go Doctors Details</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

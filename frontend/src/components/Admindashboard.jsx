import Navbar from "./Navbar";

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
    </>
  );
}

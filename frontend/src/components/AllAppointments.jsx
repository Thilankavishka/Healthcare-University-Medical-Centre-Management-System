import { useNavigate } from 'react-router-dom';
import { useState , useEffect} from 'react';
import '../styles/AllAppointments.css'
import axios from 'axios';

export default function AllAppointments(){
    const [searchTerm,setSearchTerm] = useState("");
    const [appointments,setAppointments] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await axios.post("http://localhost:8080/appointments")
        .then((res) => {
            setAppointments(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    if(!appointments) return alert ('No Appointments');
        const filteredAppointments = appointments.filter((appointments) =>{
            return appointments.pname.toLowerCase().includes(searchTerm.toLowerCase());
        });
    
    return(
        <>
        <div className="container">
            <h1>All Appointments</h1>
                <div className="container">
                        <div>
                            <button className="button-add" onClick={()=> navigate("/AddAppointment")}>Add Appointments</button>
                        </div>
                        <div className="serach-container">
                            <input type="text" 
                            placeholder="Search by Patient Name" 
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                <table>
                    <thead>
                        <tr>
                            <th>Patient Registration number</th>
                            <th>Patient Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map(appointment => (
                            <tr key={appointment._id}>
                            <td>{appointment.regno}</td>
                            <td>{appointment.pname}</td>
                            <td>{appointment.email}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.condition}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

export default function AllAppointments() {
    const [searchTerm, setSearchTerm] = useState("");
    const [appointments, setAppointments] = useState([]);
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

    if (!appointments) return alert('No Appointments');
    const filteredAppointments = appointments.filter((appointments) => {
        return appointments.pname.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
        <div>
            <Navbar></Navbar>
            <div style={{ display: 'flex', maxWidth: '1300px', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', textAlign: 'center' }}>
                <br />
                <h1 style={{ textAlign: 'center', fontFamily: 'cursive', fontSize: '50px' }}>All Appointments</h1>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div>
                        <button style={{ 
                            display: 'block', 
                            marginRight: 'auto', 
                            marginLeft: '0', 
                            position: 'relative', 
                            top: '-10px', 
                            left: '-540px', 
                            backgroundColor: '#132b5c', 
                            color: '#fff', 
                            padding: '10px 20px', 
                            border: 'none', 
                            borderRadius: '4px', 
                            transition: 'background-color 0.3s ease' 
                        }}
                            onClick={() => navigate("/AddAppointment")}>Add Appointments</button>
                    </div>
                    <div style={{ marginBottom: '20px', position: 'static', top: '180px', right: '700px' }}>
                        <input 
                            type="text"
                            placeholder="Search by Patient Name"
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                width: '160%', 
                                padding: '10px 20px', 
                                border: '1px solid #ccc', 
                                borderRadius: '4px' 
                            }} />
                    </div>
                    <br />
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: 'rgb(30, 120, 198)', fontWeight: 'bold', textAlign: 'left', padding: '12px 15px' }}>Patient Registration number</th>
                                <th style={{ backgroundColor: 'rgb(30, 120, 198)', fontWeight: 'bold', textAlign: 'left', padding: '12px 15px' }}>Patient Name</th>
                                <th style={{ backgroundColor: 'rgb(30, 120, 198)', fontWeight: 'bold', textAlign: 'left', padding: '12px 15px' }}>Email</th>
                                <th style={{ backgroundColor: 'rgb(30, 120, 198)', fontWeight: 'bold', textAlign: 'left', padding: '12px 15px' }}>Date</th>
                                <th style={{ backgroundColor: 'rgb(30, 120, 198)', fontWeight: 'bold', textAlign: 'left', padding: '12px 15px' }}>Time</th>
                                <th style={{ backgroundColor: 'rgb(30, 120, 198)', fontWeight: 'bold', textAlign: 'left', padding: '12px 15px' }}>Condition</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map(appointment => (
                                <tr key={appointment._id} style={{ backgroundColor: '#4DB4D7' }}>
                                    <td style={{ textAlign: 'left', padding: '12px 15px' }}>{appointment.regno}</td>
                                    <td style={{ textAlign: 'left', padding: '12px 15px' }}>{appointment.pname}</td>
                                    <td style={{ textAlign: 'left', padding: '12px 15px' }}>{appointment.email}</td>
                                    <td style={{ textAlign: 'left', padding: '12px 15px' }}>{appointment.date}</td>
                                    <td style={{ textAlign: 'left', padding: '12px 15px' }}>{appointment.time}</td>
                                    <td style={{ textAlign: 'left', padding: '12px 15px' }}>{appointment.condition}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </>
    )
}

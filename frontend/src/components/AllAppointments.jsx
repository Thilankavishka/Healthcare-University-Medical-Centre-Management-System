export default function AllAppointments(){
    return(
        <>
        <div className="container">
            <h1>All Appointments</h1>
                <div className="container">
                        <div>
                            <button>Add Appointments</button>
                        </div>
                        <br></br>
                        <div className="serach-container">
                            <input type="text" placeholder="Search by Patient Name" value={searchterm}></input>
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
                        {appoinments.map(appointment => (
                            <tr key={appointment._id}>
                            <td>{appointment.regno}</td>
                            <td>{appointment.pname}</td>
                            <td>{appointment.email}</td>
                            <td>{appointment.regno}</td>
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
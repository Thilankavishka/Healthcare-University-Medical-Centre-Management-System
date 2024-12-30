export default function AllAppointments(){
    return(
        <>
        <div className="">
            <h1 className="">All Appointments</h1>
                <div className="">
                    <button>Add Appointments</button>
                </div>
                <br></br>
                <div className="">
                    <input type="text" placeholder="Search by Patient Name" value={searchterm}></input>
                </div>
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
            <tbody></tbody>
        </table>
        </>
    )
}
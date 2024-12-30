export default function AllAppointments(){
    return(
        <>
        <div className="">
            <h1 className="">
                <div className="">
                    <button>Add Appointments</button>
                </div>
                <br></br>
                <div className="">
                    <input type="text" placeholder="Search by Patient Name" value={searchterm}></input>
                </div>
            </h1>
            
        </div>
        </>
    )
}
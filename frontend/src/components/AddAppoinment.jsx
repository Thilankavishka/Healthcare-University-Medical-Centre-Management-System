import React from 'react';
import '../styles/AddAppointment.css';
import {useState} from 'react';
import axios from 'axios';

export default function AddAppointment(){
    const[regno,setRegNo] = useState("");
    const[pname,setPatientName] = useState("");
    const[email,setEmail] = useState("");
    const[date,setDate] = useState("");
    const[time,setTime] = useState("");
    const[condition,setCondition] = useState("");

    async function allAppointment(e){
        e.preventDefault();

        const newAppointment = {
            regno,
            pname,
            email,
            date,
            time,
            condition
        }

        await axios.post("http://localhost:5173/AddAppoinments",newAppointment)
        .then(() => {
            alert("Appointment Added Successfully");
            Navigate('./AddAppoinement');
        })
        .catch(err =>{
            alert(err);
        })
    }

    const getCurrentDate = () =>{
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = (currentDate.getMonth()).toString();
        let day = currentDate.getDate().toString();

        month = month.length === 1 ? '0' + month : month;
        day = day.length === 1 ? '0' + day : day; 

        return `${year}-${month}-${day}`;
    };

    const handleTimeChage = (event) =>{
        setTime(event.target.value);
    };
    
    return(
        <>
        <div className='container'>
            <form className="form" onSubmit={allAppointment} >
                <div className=''>
                    <label className='Form-label'>Patient Registration Number </label>
                    <input type='text' className='form-control' value={regno} id='regno' placeholder='Enter Registration no' onChange={(e) => {setRegNo(e.target.value)}}></input>
                </div>
                <div className=''>
                    <label className='Form-label'>Patient Name </label>
                    <input type='text' className='form-control' value={pname} id='name' placeholder='Enter name' onChange={(e) => {setPatientName(e.target.value)}}></input>
                </div>
                <div className=''>
                    <label className='Form-label'>Email </label>
                    <input type='email' className='form-control' value={email} id='email' placeholder='Enter email' onChange={(e) => {setEmail(e.target.value)}}></input>
                </div>
                <div className=''>
                    <label className='Form-label'>Date </label>
                    <input type='date' className='form-control' value={date} min={getCurrentDate()} id='date' onChange={(e) => {setDate(e.target.value)}}></input>
                </div>
                <div className=''>
                    <label className='Form-label'>Time </label>
                    <input type='time' className='form-control' value={time} id='time' onChange={handleTimeChage}></input>
                </div>
                <div className=''>
                    <label className='Form-label'>Condition </label>
                    <textarea type='text' className='form-control' value={condition} id='condition' placeholder='Enter condition' onChange={(e) => {setCondition(e.target.value)}}></textarea>
                </div>
                <button type='submit'>ADD</button>
            </form>
        </div>
        </>
    )
}

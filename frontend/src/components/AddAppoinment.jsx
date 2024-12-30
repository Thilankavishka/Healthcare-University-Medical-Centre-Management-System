import React from 'react';
import '../styles/AddAppointment.css';
import {useState} from 'react';

export default function AddAppointment(){
    const[regno,setRegNo] = useState("");
    const[pname,setPatientName] = useState("");
    const[email,setEmail] = useState("");
    const[date,setDate] = useState("");
    const[time,setTime] = useState("");
    const[condition,setCondition] = useState("");

    const getCurrentDate = () =>{
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = (currentDate.getMonth()).toString();
        let day = currentDate.getDate().toString();

        month = month.length === 1 ? '0' + month : month;
        day = day.length === 1 ? '0' + day : day; 

        return `${year}-${month}-${day}`;
    };

    
    return(
        <>
        <div className='container'>
            <form className="form" >
                <div className=''>
                    <label className='Form-label'>Patient Registration Number </label>
                    <input type='text' className='form-control' value={regno} id='regno' placeholder='Enter Registration no' ></input>
                </div>
                <div className=''>
                    <label className='Form-label'>Patient Name </label>
                    <input type='text' className='form-control' value={pname} id='name' placeholder='Enter name' ></input>
                </div>
                <div className=''>
                    <label className='Form-label'>Email </label>
                    <input type='email' className='form-control' value={email} id='email' placeholder='Enter email' ></input>
                </div>
                <div className=''>
                    <label className='Form-label'>Date </label>
                    <input type='date' className='form-control' value={date} min={getCurrentDate()} id='date' ></input>
                </div>
                <div className=''>
                    <label className='Form-label'>Time </label>
                    <input type='time' className='form-control' value={time} id='time' ></input>
                </div>
                <div className=''>
                    <label className='Form-label'>Condition </label>
                    <input type='text' className='form-control' value={condition} id='condition' placeholder='Enter condition' ></input>
                </div>
                <button type='submit'>ADD</button>
            </form>
        </div>
        </>
    )
}

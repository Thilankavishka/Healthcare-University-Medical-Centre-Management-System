import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function AddAppointment() {
    let navigate = useNavigate();

    const [regno, setRegNo] = useState("");
    const [pname, setPatientName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [condition, setCondition] = useState("");

    async function addAppointment(e) {
        e.preventDefault();

        const newAppointment = {
            regno,
            pname,
            email,
            date,
            time,
            condition
        };

        await axios.post("http://localhost:8080/AddAppoinments", newAppointment)
            .then(() => {
                alert("Appointment Added Successfully");
                navigate('./AddAppoinement');
            })
            .catch(err => {
                alert(err);
            });
    }

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = (currentDate.getMonth() + 1).toString();
        let day = currentDate.getDate().toString();

        month = month.length === 1 ? '0' + month : month;
        day = day.length === 1 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    return (
        <>
            <Navbar></Navbar>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '-1rem'
            }}>

                <br />
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '40%',
                    padding: '2rem',
                    backgroundColor: '#4a9bec',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }} onSubmit={addAppointment}>
                    <h1 style={{ textAlign: 'center', fontFamily: 'cursive', fontSize: '30px' }}>Add Appointments</h1>
                    <br /><br />
                    <div style={{ marginBottom: '1rem', width: '100%' }}>
                        <label style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            display: 'block'
                        }} htmlFor="regno">Patient Registration Number</label>
                        <input type='text' style={{
                            border: 'none',
                            backgroundColor: '#fff',
                            padding: '0.5rem',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            fontSize: '1rem'
                        }} value={regno} id='regno' placeholder='Enter Registration no' onChange={(e) => { setRegNo(e.target.value) }}></input>
                    </div>
                    <div style={{ marginBottom: '1rem', width: '100%' }}>
                        <label style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            display: 'block'
                        }} htmlFor="pname">Patient Name</label>
                        <input type='text' style={{
                            border: 'none',
                            backgroundColor: '#fff',
                            padding: '0.5rem',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            fontSize: '1rem'
                        }} value={pname} id='name' placeholder='Enter name' onChange={(e) => { setPatientName(e.target.value) }}></input>
                    </div>
                    <div style={{ marginBottom: '1rem', width: '100%' }}>
                        <label style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            display: 'block'
                        }} htmlFor="email">Email</label>
                        <input type='email' style={{
                            border: 'none',
                            backgroundColor: '#fff',
                            padding: '0.5rem',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            fontSize: '1rem'
                        }} value={email} id='email' placeholder='Enter email' onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>
                    <div style={{ marginBottom: '1rem', width: '100%' }}>
                        <label style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            display: 'block'
                        }} htmlFor="date">Date</label>
                        <input type='date' style={{
                            border: 'none',
                            backgroundColor: '#fff',
                            padding: '0.5rem',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            fontSize: '1rem'
                        }} value={date} min={getCurrentDate()} id='date' onChange={(e) => { setDate(e.target.value) }}></input>
                    </div>
                    <div style={{ marginBottom: '1rem', width: '100%' }}>
                        <label style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            display: 'block'
                        }} htmlFor="time">Time</label>
                        <input type='time' style={{
                            border: 'none',
                            backgroundColor: '#fff',
                            padding: '0.5rem',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            fontSize: '1rem'
                        }} value={time} id='time' onChange={handleTimeChange}></input>
                    </div>
                    <div style={{ marginBottom: '1rem', width: '100%' }}>
                        <label style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            display: 'block'
                        }} htmlFor="condition">Condition</label>
                        <textarea type='text' style={{
                            border: 'none',
                            backgroundColor: '#fff',
                            padding: '0.5rem',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            fontSize: '1rem',
                            height: '7rem'
                        }} value={condition} id='condition' placeholder='Enter condition' onChange={(e) => { setCondition(e.target.value) }}></textarea>
                    </div>
                    <button type='submit' style={{
                        backgroundColor: '#00337C',
                        color: '#fff',
                        border: 'none',
                        padding: '0.5rem 2rem',
                        fontSize: '1rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        marginTop: '1rem'
                    }}>ADD</button>
                </form>
            </div>
        </>
    );
}

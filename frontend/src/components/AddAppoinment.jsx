import React from 'react';

export default function AddAppointment(){
    return(
        <>
        <div className='container'></div>
        <form className="form">
            <div className=''>
                <label className='Form-label'>Patient Registration Number </label>
                <input type='text' className='form-control' value='' id='regno' placeholder='Enter Registration no' ></input>
            </div>
            <div className=''>
                <label className='Form-label'>Patient Name </label>
                <input type='text' className='form-control' value='' id='name' placeholder='Enter name' ></input>
            </div>
            <div className=''>
                <label className='Form-label'>Email </label>
                <input type='email' className='form-control' value='' id='email' placeholder='Enter email' ></input>
            </div>
            <div className=''>
                <label className='Form-label'>Date </label>
                <input type='date' className='form-control' value='' id='date' ></input>
            </div>
            <div className=''>
                <label className='Form-label'>Time </label>
                <input type='time' className='form-control' value='' id='time' ></input>
            </div>
            <div className=''>
                <label className='Form-label'>Condition </label>
                <input type='text' className='form-control' value='' id='condition' placeholder='Enter condition' ></input>
            </div>
            <button type='submit'>ADD</button>
        </form>
        </>
    )
}

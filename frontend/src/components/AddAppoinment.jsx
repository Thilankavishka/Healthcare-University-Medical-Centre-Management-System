import React from 'react';

export default function AddAppointment(){
    return(
        <>
        <div className=''></div>
        <form className="">
            <div className=''>
                <label className=''>Patient Registration Number </label>
                <input type='text' className='' value='' id='regno' placeholder='Enter Registration no' ></input>
            </div>
            <div className=''>
                <label className=''>Patient Name </label>
                <input type='text' className='' value='' id='name' placeholder='Enter name' ></input>
            </div>
            <div className=''>
                <label className=''>Email </label>
                <input type='email' className='' value='' id='email' placeholder='Enter email' ></input>
            </div>
            <div className=''>
                <label className=''>Date </label>
                <input type='date' className='' value='' id='date' ></input>
            </div>
            <div className=''>
                <label className=''>Time </label>
                <input type='time' className='' value='' id='time' ></input>
            </div>
            <div className=''>
                <label className=''>Condition </label>
                <input type='text' className='' value='' id='condition' placeholder='Enter condition' ></input>
            </div>
            <button type='submit'>ADD</button>
        </form>
        </>
    )
}

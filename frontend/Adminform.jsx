import React, { useState } from 'react';
import axios from 'axios';

const AdminForm = () => {
    const [adminData, setAdminData] = useState({
        personalDetails: {
            fullName: '', initials: '', nicNumber: '', enrolmentNumber: '',
            dob: '', gender: '', religion: '', civilStatus: '', age: '',
            nationality: '', lastSchoolAttended: '', fatherOccupation: '',
            motherOccupation: '', numberOfSiblings: '', homeAddress: '', district: ''
        },
        emergencyContact: { name: '', address: '', telephone: '', relationship: '' },
        familyMedicalHistory: {
            father: { age: '', alive: true, causeOfDeath: '' },
            mother: { age: '', alive: true, causeOfDeath: '' },
            brother: { age: '', alive: true, causeOfDeath: '' },
            sister: { age: '', alive: true, causeOfDeath: '' }
        }
    });

    const handleChange = (e, category, field) => {
        setAdminData({
            ...adminData,
            [category]: { ...adminData[category], [field]: e.target.value }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/admins', adminData);
            alert('Admin details submitted successfully');
        } catch (error) {
            console.error('Error submitting admin details', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Admin Registration</h2>
            <label>Full Name: <input type="text" value={adminData.personalDetails.fullName} onChange={(e) => handleChange(e, 'personalDetails', 'fullName')} required /></label>
            <label>NIC Number: <input type="text" value={adminData.personalDetails.nicNumber} onChange={(e) => handleChange(e, 'personalDetails', 'nicNumber')} required /></label>
            <label>Gender:
                <select value={adminData.personalDetails.gender} onChange={(e) => handleChange(e, 'personalDetails', 'gender')} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            <label>Home Address: <input type="text" value={adminData.personalDetails.homeAddress} onChange={(e) => handleChange(e, 'personalDetails', 'homeAddress')} required /></label>
            
            <h3>Emergency Contact</h3>
            <label>Name: <input type="text" value={adminData.emergencyContact.name} onChange={(e) => handleChange(e, 'emergencyContact', 'name')} required /></label>
            <label>Telephone: <input type="text" value={adminData.emergencyContact.telephone} onChange={(e) => handleChange(e, 'emergencyContact', 'telephone')} required /></label>
            
            <button type="submit">Submit</button>
        </form>
    );
};

export default AdminForm;

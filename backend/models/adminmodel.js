import React, { useState } from 'react';

const AdminForm = () => {
    const [formData, setFormData] = useState({
        personalDetails: {
            fullName: '',
            initials: '',
            nicNumber: '',
            enrolmentNumber: '',
            dob: '',
            gender: '',
            religion: '',
            civilStatus: '',
            age: '',
            nationality: '',
            lastSchoolAttended: '',
            fatherOccupation: '',
            motherOccupation: '',
            numberOfSiblings: '',
            homeAddress: '',
            district: ''
        },
        emergencyContact: {
            name: '',
            address: '',
            telephone: '',
            relationship: ''
        },
        familyMedicalHistory: {
            father: { age: '', alive: true, causeOfDeath: '' },
            mother: { age: '', alive: true, causeOfDeath: '' },
            brother: { age: '', alive: true, causeOfDeath: '' },
            sister: { age: '', alive: true, causeOfDeath: '' }
        }
    });

    const handleChange = (e, category, field, subField = null) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prevData => {
            const updatedData = { ...prevData };
            if (subField) {
                updatedData[category][field][subField] = value;
            } else {
                updatedData[category][field] = value;
            }
            return updatedData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow-lg max-w-lg mx-auto bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Form</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Full Name:</label>
                <input type="text" className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.personalDetails.fullName} onChange={(e) => handleChange(e, 'personalDetails', 'fullName')} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">NIC Number:</label>
                <input type="text" className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.personalDetails.nicNumber} onChange={(e) => handleChange(e, 'personalDetails', 'nicNumber')} />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300">Submit</button>
        </form>
    );
};

export default AdminForm;

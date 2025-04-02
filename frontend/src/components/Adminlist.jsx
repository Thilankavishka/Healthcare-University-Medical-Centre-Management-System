import React, { useEffect, useState } from 'react';
import { getAdmins, deleteAdmin } from '../api/adminApi';

const AdminList = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await getAdmins();
            setAdmins(response.data);
        } catch (error) {
            console.error("Error fetching admins:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAdmin(id);
            fetchAdmins(); // Refresh list after deletion
        } catch (error) {
            console.error("Error deleting admin:", error);
        }
    };

    return (
        <div className="p-6 border rounded-lg shadow-lg max-w-2xl mx-auto bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin List</h2>
            <ul className="space-y-4">
                {admins.map(admin => (
                    <li key={admin._id} className="p-4 border rounded-lg flex justify-between items-center bg-gray-50">
                        <span className="text-gray-800 font-medium">{admin.personalDetails.fullName} - {admin.personalDetails.nicNumber}</span>
                        <button onClick={() => handleDelete(admin._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminList;

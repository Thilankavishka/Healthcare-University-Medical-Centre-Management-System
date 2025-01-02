
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import { useNavigate } from 'react-router-dom';

 export default function Medicalhistory() {
    const navigate = useNavigate();
    const [medicalData, setMedicalData] = useState([]);

    function handleReportClick() {
        navigate('/medical-report');
    }

    return (
        <>
            <div className="medical-history-page">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">VMed</a>
                        <div className="d-flex ms-auto align-items-center">
                            <div className="me-3">Medical Centre-UOV</div>
                            <div className="user-profile">Super Admin</div>
                        </div>
                    </div>
                </nav>

                <div className="main-content">
                    <div className="sidebar">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Dashboard</a>
                            </li>
                        </ul>
                    </div>

                    <div className="content">
                        <div className="page-header">USERS | MEDICAL HISTORY</div>
                        <div className="table-container">
                            <h3>View Medical History</h3>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Reg No</th>
                                        <th>Blood Pressure</th>
                                        <th>Blood Sugar</th>
                                        <th>Weight</th>
                                        <th>Temperature</th>
                                        <th>Diagnosis</th>
                                        <th>Medical Prescription</th>
                                        <th>Visit Date</th>
                                        <th>Medical Report</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicalData.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.regNo}</td>
                                            <td>{data.bloodPressure}</td>
                                            <td>{data.bloodSugar}</td>
                                            <td>{data.weight}</td>
                                            <td>{data.temperature}</td>
                                            <td>{data.diagnosis}</td>
                                            <td>{data.prescription}</td>
                                            <td>{data.visitDate}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={handleReportClick}
                                                >
                                                    View Report
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}


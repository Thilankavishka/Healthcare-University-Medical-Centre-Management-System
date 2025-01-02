import React,{useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';


export default function Form(){

    const [formData, setFormData] = useState({
        regNo: '',
        bloodPressure: '',
        bloodSugar: '',
        weight: '',
        temperature: '',
        diagnosis: '',
        prescription: '',
        visitDate: '',
        medicalReport: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleFileChange = (event) => {
        setFormData({ ...formData, medicalReport: event.target.files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        onSubmit(formDataToSend);
        setFormData({
            regNo: '',
            bloodPressure: '',
            bloodSugar: '',
            weight: '',
            temperature: '',
            diagnosis: '',
            prescription: '',
            visitDate: '',
            medicalReport: null,
        });
    };
    
    
    return(
        <>
 <div className="form-container">
            <h2 className="form-title">Patient Data Form</h2>
            <form onSubmit={handleSubmit} className="medical-form">
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="regNo">Registration Number:</label>
                        <input type="text" className="form-control" id="regNo" name="regNo" value={formData.regNo} onChange={handleChange} required />
                    </div>
                    
                      <div className="form-group">
                        <label htmlFor="bloodPressure">Blood Pressure:</label>
                        <input type="number" className="form-control" id="bloodPressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} required />
                    </div>
                      <div className="form-group">
                        <label htmlFor="bloodSugar">Blood Sugar:</label>
                        <input type="number" className="form-control" id="bloodSugar" name="bloodSugar" value={formData.bloodSugar} onChange={handleChange} required />
                    </div>
                      <div className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input type="number" className="form-control" id="weight" name="weight" value={formData.weight} onChange={handleChange} required />
                    </div>
                      <div className="form-group">
                        <label htmlFor="temperature">Temperature:</label>
                        <input type="number" className="form-control" id="temperature" name="temperature" value={formData.temperature} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="diagnosis">Diagnosis:</label>
                        <input type="text" className="form-control" id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} required />
                    </div>
                      <div className="form-group">
                        <label htmlFor="prescription">Medical Prescription:</label>
                        <input type="text" className="form-control" id="prescription" name="prescription" value={formData.prescription} onChange={handleChange} required />
                    </div>
                      <div className="form-group">
                        <label htmlFor="visitDate">Visit Date:</label>
                        <input type="date" className="form-control" id="visitDate" name="visitDate" value={formData.visitDate} onChange={handleChange} required />
                    </div>
                      <div className="form-group">
                        <label htmlFor="medicalReport">Medical Report:</label>
                        <input type="file" className="form-control" id="medicalReport" name="medicalReport" onChange={handleFileChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary submit-button">Submit</button>
            </form>
        </div>
        </>
    );
}
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
    
    
    return(
        <>

        </>
    );
}
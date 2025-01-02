const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    regno:{
        type: String,
        required: true,
        unique: true,
    },
    pname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    condition:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Appointment',appointmentSchema);
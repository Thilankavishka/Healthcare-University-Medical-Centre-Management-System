const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    regnum:{
        type: String,
        required: true,
        unique: true,
    },
    fullname:{
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
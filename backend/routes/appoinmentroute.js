const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('./Appointments', appointmentController);

router.get('./Appointments', appointmentController);

router.put('/Appointments/:id',appointmentController);


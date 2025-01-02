const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('./Appointments', appointmentController.create);

router.get('./Appointments', appointmentController.findAll);

router.put('/Appointments/:id',appointmentController.findOne);

module.exports = router;
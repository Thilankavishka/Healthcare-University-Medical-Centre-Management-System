const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.post("/Appointments", appointmentController.create);
router.get("/Appointments", appointmentController.findAll);
router.get("/Appointments/:id", appointmentController.findOne);
router.put("/Appointments/:id", appointmentController.update);

module.exports = router;

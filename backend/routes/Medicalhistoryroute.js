const express = require("express");
const router = express.Router();
const MedicalHistoryModel = require("../models/medicalhistory");
const PatientModel = require("../models/patient");
//const authMiddleware = require("../security/medicalhistory");

router.post("/medical-history", async (req, res) => {
    const {
      regNo,
      bloodPressure,
      bloodSugar,
      weight,
      temperature,
      diagnosis,
      prescription,
      visitDate,
    } = req.body;
  
    try {
      // Check if the patient exists
      const patient = await PatientModel.findOne({ regnum: regNo });
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      const medicalHistory = new MedicalHistoryModel({
        regNo,
        bloodPressure,
        bloodSugar,
        weight,
        temperature,
        diagnosis,
        prescription,
        visitDate,
      });
  
      await medicalHistory.save();
  
      res.status(201).json({ message: "Medical history added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add medical history" });
    }
  });

  router.get("/medical-history-get", async (req, res) => {
    try {
      const medicalHistory = await MedicalHistoryModel.find();
      res.status(200).json(medicalHistory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch medical history" });
    }
  });
  
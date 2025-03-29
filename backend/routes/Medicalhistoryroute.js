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

  router.get("/medical-history-user/:regNo", async (req, res) => {
    const { regNo } = req.params;
  
    try {
      const medicalHistories = await MedicalHistoryModel.find({ regNo });
      if (medicalHistories.length === 0) {
        return res
          .status(404)
          .json({ message: "No medical histories found for this patient" });
      }
      res.status(200).json(medicalHistories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch medical histories" });
    }
  });

  router.post("/medical-history", async (req, res) => {
    try {
      const { regNo, bloodPressure, bloodSugar, weight, temperature, diagnosis, prescription, visitDate } = req.body;
      
      if (!regNo || !bloodPressure || !bloodSugar || !weight || !temperature || !diagnosis || !prescription || !visitDate) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const patient = await PatientModel.findOne({ regNo });
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      const medicalHistory = new MedicalHistoryModel({ regNo, bloodPressure, bloodSugar, weight, temperature, diagnosis, prescription, visitDate });
      await medicalHistory.save();
  
      res.status(201).json({ message: "Medical history added successfully" });
    } catch (error) {
      console.error("Error adding medical history:", error);
      res.status(500).json({ message: "Failed to add medical history" });
    }
  });
  
  
  
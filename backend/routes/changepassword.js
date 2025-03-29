const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const patientmodel = require("../models/patient"); 

const router = express.Router();

router.post("/change-password", async (req, res) => {
    const { regnum, currentPassword, newPassword, confirmPassword } = req.body;
  
    try {
        
      const patient = await patientmodel.findOne({ regnum });
  
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
     
      const isMatch = await bcrypt.compare(currentPassword, patient.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
  
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;


router.post("/change-password", async (req, res) => {
    const { regnum, currentPassword, newPassword, confirmPassword } = req.body;
  
    try {
      // Find the patient by registration number
      const patient = await patientmodel.findOne({ regnum });
  
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      // Verify the current password
      const isMatch = await bcrypt.compare(currentPassword, patient.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
  
      // Code for validating new password and updating it will be added next
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
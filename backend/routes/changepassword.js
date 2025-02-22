const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const patientmodel = require("../models/patient"); // Adjust the path as necessary

const router = express.Router();

// Change Password Endpoint
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

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the patient's password
    patient.password = hashedPassword;
    await patient.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

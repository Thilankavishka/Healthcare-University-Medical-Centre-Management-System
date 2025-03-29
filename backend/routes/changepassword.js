const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const patientmodel = require("../models/patient"); 

const router = express.Router();

// Change Password Endpoint
router.post("/change-password", async (req, res) => {
    const { regnum, currentPassword, newPassword, confirmPassword } = req.body;
  
    try {
      // Code for finding patient and checking current password will be added next
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;

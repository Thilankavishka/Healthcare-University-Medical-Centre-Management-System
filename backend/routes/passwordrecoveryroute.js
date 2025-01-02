const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Patient = require("../models/patient");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
    const { fullName, email } = req.body;
  
    try {
      const user = await Patient.findOne({ fullname: fullName, email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
  
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Recovery",
        text: `Click the link below to reset your password:\n\n${process.env.CLIENT_URL}/setpassword?token=${token}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: "Recovery email sent" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Patient = require("../models/patient");
const express = require("express");

const router = express.Router();

// Route: Request password reset
router.post("/", async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: "Full name and email are required" });
  }

  try {
    // Find the user by full name and email
    const user = await Patient.findOne({ fullname: fullName, email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    // Set up the email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Define the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Recovery",
      text: `Click the link below to reset your password:\n\nhttp://localhost:3000/setpassword?token=${token}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.status(200).json({ message: "Recovery email sent" });
  } catch (err) {
    console.error("Error in password recovery:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route: Set new password
router.post("/set-password", async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user by ID from the token
    const user = await Patient.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error setting new password:", err);
    if (err.name === "TokenExpiredError") {
      res.status(400).json({ message: "Token has expired" });
    } else if (err.name === "JsonWebTokenError") {
      res.status(400).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

module.exports = router;

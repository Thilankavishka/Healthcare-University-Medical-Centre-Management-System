const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const patientmodel = require("../models/patient");
const nodemailer = require("nodemailer");
const validator = require("validator");

//........................................Image Uplaod in Registration Form.....................................................
const storage = multer.diskStorage({
  // Set up storage engine.
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //  the folder of save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Endpoint to handle image upload
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`, // Return the file path
  });
});
//.............................................................Patient Register................................................

// Configure Nodemailer
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "168bdeae3a35d2",
    pass: "d2073c73dc8285",
  },
});

router.post("/patientregister", async (req, res) => {
  try {
    const {
      regnum,
      fullname,
      email,
      address,
      city,
      course,
      department,
      faculty,
      bloodgroup,
      gender,
      password,
      image,
    } = req.body;

    // Validate required fields
    if (
      !regnum ||
      !fullname ||
      !email ||
      !password ||
      !gender ||
      !address ||
      !city ||
      !course ||
      !department ||
      !faculty ||
      !bloodgroup ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if patient already exists
    const patient = await patientmodel.findOne({ regnum: regnum });
    if (patient) {
      return res.status(400).json({
        message: "Patient with this registration number already exists",
      });
    }

    // Hash the password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create new patient
    const newpatient = new patientmodel({
      regnum,
      fullname,
      email,
      address,
      city,
      course,
      department,
      faculty,
      bloodgroup,
      gender,
      password: hashpassword,
      image,
    });

    await newpatient.save();

    // Send email with username and password
    const mailOptions = {
      from: "hello@demomailtrap.co", // Sender email
      to: email, // Recipient email
      subject: "Patient Registration Successful",
      text: `Dear ${fullname},\n\nYour registration as a patient has been successfully completed.\n\nUsername: ${regnum}\nPassword: ${password}\n\nPlease keep your credentials safe.\n\nBest regards,\nMedical Center University of Vavuniya`, // Email body
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Error sending email", error: error.message });
      } else {
        console.log("Email sent:", info.response);
        return res.json({
          registered: true,
          message:
            "Patient registered successfully. Check your email for credentials.",
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//..........................................................Show Patient Details to Admins.................................................
router.get("/getpatientdetails", async (req, res) => {
  try {
    const patients = await patientmodel.find();
    return res.json(patients);
  } catch (err) {
    console.log(err);
  }
});

//.......................................................Patient Details to dashboard...................................................
router.get("/patientdetails/:regnum", async (req, res) => {
  try {
    const regnum = req.params.regnum;
    // Find patient by regnum
    const patient = await patientmodel.findOne({ regnum: regnum });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      patdet: patient,
    });
  } catch (error) {
    console.error(error);
  }
});

//.....................................Count Total Number of patients..........................................
router.get("/countpatients", async (req, res) => {
  try {
    const numofpatients = await patientmodel.countDocuments(); // Add await here
    res.json({ count: numofpatients }); // Send count in JSON format
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//.....................................Delete Patient Details..........................................

router.delete("/:regnum", async (req, res) => {
  const { regnum } = req.params;

  try {
    const deletedPatient = await patientmodel.findOneAndDelete({ regnum });

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res
      .status(200)
      .json({ message: "Patient deleted successfully", data: deletedPatient });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//..........................................................Update Patient Details.................................................
router.put("/updatepatient/:regnum", async (req, res) => {
  try {
    const { regnum } = req.params;
    const {
      fullname,
      email,
      address,
      city,
      course,
      department,
      faculty,
      bloodgroup,
      gender,
      password,
      image,
    } = req.body;

    // Validate required fields (except password which is optional for update)
    if (
      !fullname ||
      !email ||
      !gender ||
      !address ||
      !city ||
      !course ||
      !department ||
      !faculty ||
      !bloodgroup ||
      !image
    ) {
      return res.status(400).json({ message: "All fields except password are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Find the patient
    const patient = await patientmodel.findOne({ regnum });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Prepare update data
    const updateData = {
      fullname,
      email,
      address,
      city,
      course,
      department,
      faculty,
      bloodgroup,
      gender,
      image,
    };

    // Only update password if a new one is provided
    if (password && password.trim() !== "") {
      const hashpassword = await bcrypt.hash(password, 10);
      updateData.password = hashpassword;
    }

    // Update the patient
    const updatedPatient = await patientmodel.findOneAndUpdate(
      { regnum },
      updateData,
      { new: true } // Return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Patient details updated successfully",
      patient: updatedPatient,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

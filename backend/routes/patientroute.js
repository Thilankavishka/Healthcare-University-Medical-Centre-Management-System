const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const patientmodel = require("../models/patient");
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

    if (!regnum || !fullname || !password || !gender || !email) {
      return res.status(400).json({ message: "Provide all required fields" });
    }

    const patient = await patientmodel.findOne({ regnum: regnum }); //patient validate by registeration number
    if (patient) {
      return res
        .status(400)
        .json({ message: "patient Registration Number is Already Registered" });
    }

    //create password to hashpassword
    const hashpassword = await bcrypt.hash(password, 10);
    //add new patient to database
    const newpatient = new patientmodel({
      regnum: regnum,
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

    return res.json({
      registered: true,
      message: "Patient Registered Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "server error" });
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

module.exports = router;

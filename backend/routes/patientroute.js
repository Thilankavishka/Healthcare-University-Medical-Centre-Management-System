const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const patientmodel = require("../models/patient");

router.post("/patientregister", async (req, res) => {
  try {
    const {
      regnum,
      fullname,
      address,
      city,
      course,
      department,
      faculty,
      bloodgroup,
      gender,
      password,
    } = req.body;

    if (!regnum || !fullname || !password || !gender) {
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
      address,
      city,
      course,
      department,
      faculty,
      bloodgroup,
      gender,
      password: hashpassword,
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

module.exports = router;

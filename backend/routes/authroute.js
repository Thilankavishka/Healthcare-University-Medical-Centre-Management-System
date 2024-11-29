const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const superadminmodel = require("../models/superadmin.js");
const patientmodel = require("../models/patient.js");
const adminmodel = require("../models/admin.js");

const verifySuperAdmin = require("../security/Superadminauth.js");
const verifyPatient = require("../security/userauth.js");
const verifyAdmin = require("../security/adminauth.js");
const router = express.Router();

//login Superadmin/admin/patient function............................................................................................................
router.post("/login", async (req, res) => {
  try {
    //username password and role request from user
    const { username, password, role } = req.body;
    //validation part
    if (!username || !password || !role) {
      res.status(400).json({ message: "Provide all fields" });
    }
    if (role === "superadmin") {
      const admin = await superadminmodel.findOne({ username }); //admin validation by username
      if (!admin) {
        return res.json({ message: "admin not registered" });
      }
      const validpassword = await bcrypt.compare(password, admin.password);
      if (!validpassword) {
        return res.json({ message: "wrong Password" });
      }
      //asign token for admin
      const token = jwt.sign(
        { username: admin.username, role: "superadmin" },
        process.env.superadmin_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({
        login: true,
        role: "superadmin",
        message: "Admin Login Successfully",
        token,
      });
      //student login part
    } else if (role === "patient") {
      const patient = await patientmodel.findOne({ regnum: username });
      if (!patient) {
        return res.json({
          message: "patient registration Number not registered",
        });
      }
      const validpassword = await bcrypt.compare(password, patient.password);
      if (!validpassword) {
        return res.json({ message: "wrong Password" });
      }
      //asign token for student
      const token = jwt.sign(
        { username: patient.regnum, role: "patient" },
        process.env.Patient_Key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({
        login: true,
        role: "patient",
        message: "Patient Login Successfully",
        token,
        username: patient.regnum,
      });
    } else if (role === "admin") {
      const admin = await adminmodel.findOne({ username });
      if (!admin) {
        return res.json({
          message: "admin is not registered",
        });
      }
      const validpassword = await bcrypt.compare(password, admin.password);
      if (!validpassword) {
        return res.json({ message: "wrong Password" });
      }
      //asign token for student
      const token = jwt.sign(
        { username: admin.username, role: "admin" },
        process.env.Admin_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({
        login: true,
        role: "admin",
        message: "admin Login Successfully",
        token,
        username: admin.username,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//SuperAdmin profile details...................................................................................................................
router.get("/adprofile/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const profile = await superadminmodel.findOne({ username: username });
    return res.json({ name: profile.name });
  } catch (err) {
    return res.json(err);
  }
});
router.get("/verify", verifySuperAdmin, (req, res) => {
  return res.json({ login: true, role: req.role, username: req.username });
  //console.log(res.json());
  //console.log(res.data.role);
});
router.get("/verifyadmin", verifyAdmin, (req, res) => {
  return res.json({ login: true, role: req.role, username: req.username });
  //console.log(res.json());
  //console.log(res.data.role);
});

router.get("/verifypatient", verifyPatient, (req, res) => {
  return res.json({ login: true, role: req.role, username: req.username });
  //console.log(res.json());
  //console.log(res.data.role);
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

//..................................................Admin Register.....................................................................................
router.post("/registerAdmin", async (req, res) => {
  const { username, gender, admintype, password } = req.body;

  // Validate the input data
  if (!username || !gender || !admintype || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if adminusername already exists
    const existingAdmin = await adminmodel.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: "Username already Registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const newAdmin = new adminmodel({
      username,
      gender,
      admintype,
      password: hashedPassword,
    });

    // Save admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while registering admin" });
  }
});

//........................................Show Admin Details.............................................
router.get("/admindetails/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const admin = await adminmodel.findOne({ username: username });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      admindet: admin,
    });
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;

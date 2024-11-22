const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const superadminmodel = require("../models/superadmin.js");
const patientmodel = require("../models/patient.js");

const verifySuperAdmin = require("../security/adminauth.js");
const verifyPatient = require("../security/userauth.js");
const router = express.Router();

//login Superadmin function
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
        process.env.admin_key
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
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//SuperAdmin profile details
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

router.get("/verifypatient", verifyPatient, (req, res) => {
  return res.json({ login: true, role: req.role, username: req.username });
  //console.log(res.json());
  //console.log(res.data.role);
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

module.exports = router;

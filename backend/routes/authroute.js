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
    const { username, password, role } = req.body;

    // Validate required fields
    if (!username || !password || !role) {
      return res.status(400).json({ message: "Provide all fields" });
    }

    let user;
    let roleKey;
    let roleName;

    // Role-based authentication
    if (role === "superadmin") {
      user = await superadminmodel.findOne({ username });
      roleKey = process.env.superadmin_key;
      roleName = "superadmin";
    } else if (role === "patient") {
      user = await patientmodel.findOne({ regnum: username });
      roleKey = process.env.Patient_Key;
      roleName = "patient";
    } else if (role === "admin") {
      user = await adminmodel.findOne({ username });
      roleKey = process.env.Admin_key;
      roleName = "admin";
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // If no user is found
    if (!user) {
      return res.status(401).json({ message: `${roleName} not registered` });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username || user.regnum, role: roleName },
      roleKey,
      { expiresIn: "1h" }
    );

    // Set token in cookie
    res.cookie("token", token, { httpOnly: true, secure: true });

    return res.json({
      login: true,
      role: roleName,
      message: `${roleName} Login Successfully`,
      token,
      username: user.username || user.regnum,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "An internal error occurred" });
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

//........................................Show Admin Details to dashboard.............................................
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

//..........................................................Show Admin Details to Admins.................................................
router.get("/getadmindetails", async (req, res) => {
  try {
    const admins = await adminmodel.find();
    return res.json(admins);
  } catch (err) {
    console.log(err);
  }
});

//..........................................................Delete Admin Details.................................................
router.delete("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const deletedAdmin = await adminmodel.findOneAndDelete({ username });

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "Admin deleted successfully", data: deletedAdmin });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Update admin details
router.put("/updateAdmin/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { gender, admintype, password } = req.body;

    // Find existing admin
    const admin = await adminmodel.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Prepare update object
    const updateData = {
      gender,
      admintype,
    };

    // Hash and update password only if a new one is provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    await adminmodel.updateOne({ username }, { $set: updateData });

    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;

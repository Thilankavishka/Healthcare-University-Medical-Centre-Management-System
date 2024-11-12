const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const superadminmodel = require("../models/superadmin.js");

const verifyAdmin = require("../security/adminauth.js");
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
    if (role === "admin") {
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
        { username: admin.username, role: "admin" },
        process.env.admin_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({
        login: true,
        role: "admin",
        message: "Admin Login Successfully",
        token,
      });
      //student login part
    } else if (role === "student") {
      /*const student = await studentmodel.findOne({ username });
      if (!student) {
        return res.json({ message: "Student username not registered" });
      }
      const validpassword = await bcrypt.compare(password, student.password);
      if (!validpassword) {
        return res.json({ message: "wrong Password" });
      }
      //asign token for student
      const token = jwt.sign(
        { username: student.username, role: "student" },
        process.env.Student_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({
        login: true,
        role: "student",
        message: "Student Login Successfully",
        token,
      });
    } else {
    }
    */
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/verify", verifyAdmin, (req, res) => {
  return res.json({ login: true, role: req.role, username: req.username });
  //console.log(res.json());
  //console.log(res.data.role);
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

module.exports = router;

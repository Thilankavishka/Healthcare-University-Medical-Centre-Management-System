const express = require("express");
const router = express.Router();

const messagemodel = require("../models/sendmessage");

//save messages into database
router.post("/sendmsg", async (req, res) => {
  try {
    const { regnum, name, faculty, course, email, mobnum, message } = req.body;
    if (
      !regnum ||
      !name ||
      !faculty ||
      !course ||
      !email ||
      !mobnum ||
      !message
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newmsg = new messagemodel({
      regnum,
      name,
      faculty,
      course,
      email,
      mobnum,
      message,
    });
    await newmsg.save();
    return res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

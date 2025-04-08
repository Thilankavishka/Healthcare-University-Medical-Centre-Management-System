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

//...........................................Show Message to superadmin............................................
router.get("/getusermessages", async (req, res) => {
  try {
    const messages = await messagemodel.find(); //Fetch all messages from the database
    res.status(200).json(messages); //Send the messages as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error retrieving messages", error });
  }
});

//.....................................Count Total Number of messages..........................................
router.get("/countmessages", async (req, res) => {
  try {
    const numofmessages = await messagemodel.countDocuments(); // Add await here
    res.json({ count: numofmessages }); // Send count in JSON format
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


router.delete('/deletemessage/:id', async (req, res) => {
  try {
    const deletedMessage = await messagemodel.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error });
  }
});

module.exports = router;

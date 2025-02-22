const Appointment = require("../models/appointment");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  const { regno, pname, email, date, time, condition } = req.body;

  const appointment = new Appointment({
    regno,
    pname,
    email,
    date,
    time,
    condition,
  });

  // Save appointment in the database
  appointment
    .save()
    .then(() => {
      res.status(201).send({ message: "Appointment Registered successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error occurred while registering the appointment",
      });
    });
};

exports.findAll = (req, res) => {
  Appointment.find()
    .then((appointments) => {
      res.send(appointments);
    })
    .catch((err) => {
      console.error("Error retrieving appointments:", err);
      res.status(500).send({
        message:
          err.message ||
          "Error occurred while retrieving appointment information",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Appointment.findById(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Appointment not found with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving appointment with id " + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;

  Appointment.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Appointment not found with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error updating appointment with id " + id });
    });
};

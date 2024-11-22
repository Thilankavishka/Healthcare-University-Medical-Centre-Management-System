const mongoose = require("mongoose");

const patientschema = new mongoose.Schema(
  {
    regnum: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    course: { type: String, required: true },
    department: { type: String, required: true },
    faculty: { type: String, required: true },
    bloodgroup: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const patientmodel = mongoose.model("patient", patientschema);

module.exports = patientmodel;

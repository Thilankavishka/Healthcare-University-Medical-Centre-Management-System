const mongoose = require("mongoose");

const msgschema = new mongoose.Schema(
  {
    regnum: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    faculty: { type: String, required: true },
    course: { type: String, required: true },
    email: { type: String, required: true },
    mobnum: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const msgmodel = mongoose.model("message", msgschema);

module.exports = msgmodel;

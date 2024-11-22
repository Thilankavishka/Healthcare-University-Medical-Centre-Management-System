const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  admintype: { type: String, required: true },
  password: { type: String, required: true },
});

const adminmodel = mongoose.model("admin", adminSchema);

module.exports = adminmodel;

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const superadminmodel = mongoose.model("superadmin", adminSchema);

module.exports = superadminmodel;

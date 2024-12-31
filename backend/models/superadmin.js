const mongoose = require("mongoose");

const superadminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const superadminmodel = mongoose.model("superadmin", superadminSchema);

module.exports = superadminmodel;

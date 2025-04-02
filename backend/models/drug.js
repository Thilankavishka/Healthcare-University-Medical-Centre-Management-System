const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
});

const Drug = mongoose.model("Drug", drugSchema);

module.exports = Drug;

const express = require("express");
const Drug = require("../models/Drug");

const router = express.Router();

// Get all drugs
router.get("/", async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.json(drugs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching drugs" });
  }
});

// Add a new drug
router.post("/", async (req, res) => {
  const { name, dosage, quantity } = req.body;

  if (!name || !dosage || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newDrug = new Drug({ name, dosage, quantity });
    await newDrug.save();
    res.status(201).json(newDrug);
  } catch (error) {
    res.status(500).json({ error: "Error adding drug" });
  }
});

// Update drug quantity
router.put("/:id", async (req, res) => {
  const { quantity } = req.body;

  try {
    const updatedDrug = await Drug.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    if (!updatedDrug) return res.status(404).json({ error: "Drug not found" });
    res.json(updatedDrug);
  } catch (error) {
    res.status(500).json({ error: "Error updating drug" });
  }
});

// Delete a drug
router.delete("/:id", async (req, res) => {
  try {
    const deletedDrug = await Drug.findByIdAndDelete(req.params.id);
    if (!deletedDrug) return res.status(404).json({ error: "Drug not found" });
    res.json({ message: "Drug deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting drug" });
  }
});

// Get one drug
router.get("/:id", async (req, res) => {
    try {
      const drug = await Drug.findById(req.params.id);
      if (!drug) {
        return res.status(404).json({ success: false, message: "Drug not found" });
      }
      res.json({ success: true, drug });
    } catch (error) {
      console.error("Error fetching drug:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

module.exports = router;

const express = require("express");
const Supplier = require("../models/supplierModel");

const router = express.Router();

router.post("/suppliers", async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/suppliers/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ supplier_id: req.params.id });
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/suppliers/:id", async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findOneAndUpdate(
      { supplier_id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSupplier) return res.status(404).json({ error: "Supplier not found" });
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;

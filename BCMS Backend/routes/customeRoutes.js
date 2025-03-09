const express = require("express");
const Customer = require("../models/customerModel");

const router = express.Router();

router.post("/customers", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/customers/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCustomer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/customers/:id", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({ _id: req.params.id });
    if (!deletedCustomer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

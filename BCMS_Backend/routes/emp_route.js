const express = require("express");
const mongoose = require("mongoose");
const Employees = require("../models/employee"); // Import Employee Model
const Users = require("../models/user")

const router = express.Router();
router.post("/employees", async (req, res) => {
  try {
    const { username, department, position, date_of_joining, manager_username } = req.body;

    const existingUser = await Users.findOne({ username: username });

    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist. Please add the user first!" });
    }

    const newEmployee = new Employees({ username, department, position, date_of_joining, manager_username});
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employees.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employees.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/employees/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employees.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

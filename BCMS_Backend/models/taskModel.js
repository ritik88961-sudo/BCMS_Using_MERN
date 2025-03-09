const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  assigned_to: { type: [String], required: true },
  created_by: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  due_date: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

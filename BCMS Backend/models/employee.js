const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  date_of_joining: { type: String, required: true },
  manager_username: { type: String, required: true },
});
const Employees = mongoose.model("Employees", employeeSchema);
module.exports = Employees;
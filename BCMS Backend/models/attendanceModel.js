const mongoose = require('mongoose');

// Define the Attendance schema
const attendanceSchema = new mongoose.Schema({
  emp_username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent','Leave'],
    required: true,
  },
});

// Create the model
const Attendance = mongoose.model('attendances', attendanceSchema);

module.exports = Attendance;

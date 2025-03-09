const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], required: true },
  progress: { type: String, default: 0 },
  assignedTo: { type: [String], default: [] }, // Array of usernames
});

module.exports = mongoose.model('Training', TrainingSchema);

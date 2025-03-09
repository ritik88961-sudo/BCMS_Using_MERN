const express = require('express');
const Training = require('../models/trainingModel');
const router = express.Router();

// Route to get all training data
router.get('/training-data', async (req, res) => {
  try {
    const upcomingTraining = await Training.find({ status: 'Upcoming' });
    const ongoingTraining = await Training.find({ status: 'Ongoing' });
    const trainingHistory = await Training.find({ status: 'Completed' });

    res.status(200).json({
      upcomingTraining,
      ongoingTraining,
      trainingHistory,
    });
  } catch (error) {
    console.error('Error fetching training data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to create new training
router.post('/training', async (req, res) => {
  try {
    const { name, date, status, progress } = req.body;
    const newTraining = new Training({
      name,
      date,
      status,
      progress,
      assignedTo: [],
    });
    await newTraining.save();
    res.status(201).json({ training: newTraining });
  } catch (error) {
    console.error('Error creating training:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to assign multiple employees to a training course
router.put('/assign-training', async (req, res) => {
  const { usernames, trainingId } = req.body;
  try {
    const training = await Training.findById(trainingId);
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }

    training.assignedTo = [...new Set([...training.assignedTo, ...usernames])];

    await training.save();
    res.status(200).json({ message: 'Employees assigned successfully', training });
  } catch (error) {
    console.error('Error assigning training:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to edit training details
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, status, progress } = req.body;

  try {
    const training = await Training.findByIdAndUpdate(
      id,
      { name, date, status, progress },
      { new: true }
    );

    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }

    res.status(200).json({ message: 'Training updated successfully', training });
  } catch (error) {
    console.error('Error updating training:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all trainings assigned to a specific employee
router.get('/assigned-trainings/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const trainings = await Training.find({ assignedTo: username });
    res.status(200).json(trainings);
  } catch (error) {
    console.error('Error fetching assigned trainings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

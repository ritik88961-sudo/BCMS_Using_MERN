const express = require('express');
const Attendance = require('../models/attendanceModel');
const User = require('../models/user');

const router = express.Router();

// Mark attendance (POST)
router.post('/mark', async (req, res) => {
  try {
    const { emp_username, status } = req.body;

    if (!['Present', 'Absent', 'Leave'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Choose "Present", "Absent" or "Leave".' });
    }

    const userDetails = await User.findOne({ username: emp_username });
    if (!userDetails) {
      return res.status(401).json({ error: 'User not found' });
    }

    const newAttendance = new Attendance({
      emp_username,
      date: new Date(),
      status,
    });

    await newAttendance.save();
    res.status(200).json({ message: 'Attendance marked successfully!' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all attendance records (GET)
router.get('/records', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    if (!attendanceRecords.length) {
      return res.status(404).json({ error: 'No attendance records found.' });
    }
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get attendance records by emp_username (GET)
router.get('/:emp_username', async (req, res) => {
  try {
    const { emp_username } = req.params;
    const attendanceRecords = await Attendance.find({ emp_username }).sort({ date: -1 });
    if (!attendanceRecords.length) {
      return res.status(404).json({ error: 'No attendance records found.' });
    }
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update attendance record (PUT)
router.put('/attendance/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date } = req.body;

    if (!status || !date) {
      return res.status(400).json({ error: 'Status and date are required to update attendance.' });
    }

    const attendanceRecord = await Attendance.findOne({
      _id:id,
    });

    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found for the given employee and date.' });
    }

    attendanceRecord.status = status;
    attendanceRecord.date = date;
    await attendanceRecord.save();

    res.status(200).json({ message: 'Attendance updated successfully!', attendance: attendanceRecord });
  } catch (err) {
    console.error('Error updating attendance:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Delete attendance record (DELETE)
router.delete('/attendance/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required to delete attendance.' });
    }

    const attendanceRecord = await Attendance.findOneAndDelete({
      _id:id,
    });

    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found for the given employee and date.' });
    }

    res.status(200).json({ message: 'Attendance record deleted successfully!' });
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;

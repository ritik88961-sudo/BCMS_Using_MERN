const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../services/jobServices");

const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new job
router.post("/", async (req, res) => {
  try {
    const newJob = await createJob(req.body);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update job
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await updateJob(req.params.id, req.body);
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete job
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await deleteJob(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const Job = require("../models/jobModel");

// Get All Jobs
const getAllJobs = async () => {
  return await Job.find();
};

// Get a Single Job by ID
const getJobById = async (id) => {
  return await Job.findById(id);
};

// Create a New Job
const createJob = async (jobData) => {
  const newJob = new Job(jobData);
  return await newJob.save();
};

// Update a Job
const updateJob = async (id, jobData) => {
  return await Job.findByIdAndUpdate(id, jobData, { new: true });
};

// Delete a Job
const deleteJob = async (id) => {
  return await Job.findByIdAndDelete(id);
};

module.exports = { getAllJobs, getJobById, createJob, updateJob, deleteJob };

import React, { useEffect, useState } from "react";
import JobForm from "./JobForm";
import "../../../styles/post_login_styles/modules/job.css";

const Recruit = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs");
      const jobData = await response.json();
      setJobs(jobData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await fetch(`http://localhost:5000/api/jobs/${id}`, { method: "DELETE" });
        alert("Job deleted successfully!");
        fetchJobs(); // Refresh list
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <>
      <div className="job-container">
        <h2>Recruitment & Hiring</h2>
        <button onClick={() => { setSelectedJob(null); setShowModal(true); }} className="add-job-btn">
          + Add Job
        </button>

        <div className="job-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Department:</strong> {job.department}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Descrition:</strong> {job.description}</p>
                <div className="job-actions">
                  <button onClick={() => handleEdit(job)}>Edit</button>
                  <button onClick={() => handleDelete(job._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs available</p>
          )}
        </div>

        {showModal && <JobForm closeModal={() => setShowModal(false)} job={selectedJob} refreshJobs={fetchJobs} />}
      </div>
    </>
  );
};

export default Recruit;

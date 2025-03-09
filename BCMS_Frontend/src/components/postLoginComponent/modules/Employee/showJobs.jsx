import React, { useEffect, useState } from "react";
import "../../../styles/post_login_styles/modules/job.css";

const ShowJobs = () => {
  const [jobs, setJobs] = useState([]);

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
  return (
    <>
      <div className="job-container">
        <h2>Job Openings</h2>
        <div className="job-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Department:</strong> {job.department}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary} Monthly</p>
                <p><strong>Descrition:</strong> {job.description}</p>
              </div>
            ))
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowJobs;

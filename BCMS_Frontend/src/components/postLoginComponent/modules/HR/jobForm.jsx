import React, { useEffect, useState } from "react";
import "../../../styles/post_login_styles/modules/job.css";

const JobForm = ({ closeModal, job, refreshJobs }) => {
  const [formData, setFormData] = useState({ title: "", department: "", location: "", salary: "",description:"" });

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createJob = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const updateJob = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (job) {
      await updateJob(job._id, formData);
      alert("Job updated successfully!");
    } else {
      await createJob(formData);
      alert("Job created successfully!");
    }
    refreshJobs();
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required />
          <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" required />
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
          <button type="submit">{job ? "Update Job" : "Create Job"}</button>
          <button type="button" onClick={closeModal} className="close-btn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;

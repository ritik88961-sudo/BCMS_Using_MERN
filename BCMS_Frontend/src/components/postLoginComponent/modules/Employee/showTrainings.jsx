import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "../../../styles/post_login_styles/modules/showTraining.css";

const ShowTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const username = localStorage.getItem("username")
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/training/assigned-trainings/${username}`);
        setTrainings(response.data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };
    fetchTrainings();
  }, []);

  return (
    <div className="show-trainings-container">
      <h2 className="title">Assigned Trainings</h2>
      <table className="trainings-table">
        <thead>
          <tr>
            <th>Training Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((training) => (
            <tr key={training._id}>
              <td>{training.name}</td>
              <td>{format(new Date(training.date), "dd MMM yyyy")}</td>
              <td className={training.status.toLowerCase()}>{training.status}</td>
              <td>{training.progress}</td>
              <td>{training.assignedTo.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTrainings;
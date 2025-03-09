import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/post_login_styles/modules/training.css";

const TrainingManager = () => {
  const [trainings, setTrainings] = useState({
    upcomingTraining: [],
    ongoingTraining: [],
    trainingHistory: [],
  });

  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showEmployeePopup, setShowEmployeePopup] = useState(false);
  const [trainingToAssign, setTrainingToAssign] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [trainingToEdit, setTrainingToEdit] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newTraining, setNewTraining] = useState({ name: "", date: "", status: "Upcoming", progress: 0 });

  useEffect(() => {
    fetchTrainings();
    fetchEmployees();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/training/training-data");
      setTrainings(response.data);
    } catch (error) {
      console.error("Error fetching training data:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/emp/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const openEmployeePopup = (trainingId) => {
    setTrainingToAssign(trainingId);
    setShowEmployeePopup(true);
  };

  const closeEmployeePopup = () => {
    setSelectedEmployees([]);
    setShowEmployeePopup(false);
  };

  const toggleEmployeeSelection = (username) => {
    setSelectedEmployees((prev) =>
      prev.includes(username) ? prev.filter((emp) => emp !== username) : [...prev, username]
    );
  };

  const assignTraining = async () => {
    if (selectedEmployees.length === 0) {
      alert("Please select at least one employee");
      return;
    }

    try {
      await axios.put("http://localhost:5000/api/training/assign-training", {
        usernames: selectedEmployees,
        trainingId: trainingToAssign,
      });
      alert("Training assigned successfully!");
      closeEmployeePopup();
      fetchTrainings();
    } catch (error) {
      console.error("Error assigning training:", error);
    }
  };

  const openEditPopup = (training) => {
    setTrainingToEdit(training);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setTrainingToEdit(null);
    setShowEditPopup(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setTrainingToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const updateTraining = async () => {
    try {
      await axios.put(`http://localhost:5000/api/training/update/${trainingToEdit._id}`, trainingToEdit);
      alert("Training updated successfully!");
      closeEditPopup();
      fetchTrainings();
    } catch (error) {
      console.error("Error updating training:", error);
    }
  };
   const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewTraining((prev) => ({ ...prev, [name]: value }));
  };
   const openAddPopup = () => {
    setShowAddPopup(true);
  };

  const closeAddPopup = () => {
    setNewTraining({ name: "", date: "", status: "", progress: 0 });
    setShowAddPopup(false);
  };
  const addTraining = async () => {
    try {
      await axios.post("http://localhost:5000/api/training/training", newTraining);
      alert("Training added successfully!");
      closeAddPopup();
      fetchTrainings();
    } catch (error) {
      console.error("Error adding training:", error);
    }
  };

  return (
    <div className="training-container">
      <h2>Training Management</h2>
      <button onClick={openAddPopup} className="add_btn">Add Training</button>
      {Object.keys(trainings).map((section) => (
        <div key={section} className="training-section">
          <h3>{section.replace("Training", " Training")}</h3>
          <div className="training-list">
            {trainings[section]?.map((training) => (
              <div key={training._id} className="training-card">
                <p><strong>{training.name}</strong></p>
                <p>Date: {new Date(training.date).toLocaleDateString()}</p>
                <p>Status: {training.status}</p>
                <p>Progress: {training.progress}</p>
                {<p>Assigned To: {training.assignedTo.join(", ")}</p>}
                <button onClick={() => openEmployeePopup(training._id)}>Assign</button>
                <button onClick={() => openEditPopup(training)}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showEmployeePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Select Employees</h3>
            <div className="assign">
              <span>Employee Name</span>
              <span>Assign</span>
            </div>
            
            {employees.map((emp) => (
              <div key={emp._id} className="employee-option">
                <div className="emp_det">
                  <label className="emp_names">{emp.username}</label>
                    <input
                      className="check_emp"
                      type="checkbox"
                      checked={selectedEmployees.includes(emp.username)}
                      onChange={() => toggleEmployeeSelection(emp.username)}
                    />
                </div>
              </div>
            ))}
            <button onClick={assignTraining}>Assign</button>
            <button onClick={closeEmployeePopup}>Cancel</button>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Edit Training</h3>
            <label>Name: <input type="text" name="name" value={trainingToEdit.name} onChange={handleEditChange} /></label>
            <label>Date: <input type="date" name="date" value={new Date(trainingToEdit.date).toLocaleDateString()} onChange={handleEditChange} /></label>
            <label>Status: 
              <select name="status" value={trainingToEdit.status} onChange={handleEditChange}>
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
              </label>
            <label>Progress: <input type="text" name="progress" value={trainingToEdit.progress} onChange={handleEditChange} /></label>
            <button onClick={updateTraining}>Save Changes</button>
            <button onClick={closeEditPopup}>Cancel</button>
          </div>
        </div>
      )}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Add Training</h3>
            <label className="addTrainingFormLabel">Name: <input type="text" name="name" value={newTraining.name} onChange={handleAddChange} placeholder="Name"/></label>
            <label className="addTrainingFormLabel">Date: <input type="date" name="date" value={newTraining.date} onChange={handleAddChange} /></label>
            <label className="addTrainingFormLabel">Status: 
              <select name="status" value={newTraining.status} onChange={handleAddChange}>
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>  
              </select>
            </label>
            <label className="addTrainingFormLabel">Progress: <input type="text" name="progress" value={newTraining.progress} onChange={handleAddChange} /></label>
            <button onClick={addTraining}>Add Training</button>
            <button onClick={closeAddPopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>

  );
};

export default TrainingManager;
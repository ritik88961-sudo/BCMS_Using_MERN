import "../../../styles/post_login_styles/modules/employee.css"
import { useState, useEffect } from "react";

const EmployeeDashboard = () => {
  const username = localStorage.getItem("username");
  const [attendance, setAttendance] = useState({});
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [trainings, setTrainings] = useState([]);
  let presentDays = 0;
  let absentDays = 0;
  let leaveDays = 0;
  let TasksCount = 0;
  let trainingCount = 0;
  const fetchAttendance = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/attendance/${username}`);
      const data = await res.json();
      setAttendance(data);
    } catch (error) {
      console.error("Error fetching attendance", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/tsk/tasks`);
      const data = await res.json();
      setTasks(data);
      const completedCount = data.filter(task => task.status === "Completed").length;
      setCompletedTasks(completedCount);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const fetchTrainings = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/training/assigned-trainings/${username}`);
      const data = await res.json();
      setTrainings(data);
    } catch (error) {
      console.error("Error fetching trainings", error);
    }
  };
  const countAttendance = ()=>{
    attendance.length >0 ? attendance.map(ele=>{
      if(ele.status === "Present"){
        presentDays+=1  
      }
      if(ele.status === "Absent"){
        absentDays+=1;
      }
      if(ele.status === "Leave"){
        leaveDays+=1
      }
      
    }) : ""
  }
  const countTask = ()=>{
    tasks.length >0 ? tasks.map(ele=>{
      ele.assigned_to.map(users=>{
        console.log(users)
        if(users === username){
          TasksCount+=1;
        }
      }) 
      console.log(ele.assigned_to)     
    }) : ""
  }
  const countTrainnings = ()=>{
    trainings.length >0 ? trainings.map(ele=>{
      ele.assignedTo.map(users=>{
        console.log(users)
        if(users === username){
          trainingCount+=1;
        }
      }) 
      console.log(ele.assigned_to)     
    }) : ""
  }
  useEffect(() => {
    fetchAttendance();
    fetchTasks();
    fetchTrainings();  
  }, []);
  countAttendance()
  countTask()
  console.log(TasksCount)
  return (
    <div className="emp-dashboard-container">
      <h2>Employee Dashboard</h2>

      {/* Attendance Summary */}
      <div className="dashboard-card">
        <h3>Attendance Summary</h3>
        <p><strong>Present Days:</strong> {presentDays}</p>
        <p><strong>Absent Days:</strong> {absentDays}</p>
        <p><strong>Late Days:</strong> {leaveDays}</p>
      </div>

      {/* Task Summary */}
      <div className="dashboard-card">
        <h3>Task Summary</h3>
        <p><strong>Total Assigned Tasks:</strong> {TasksCount}</p>
      </div>

      {/* Training Summary */}
      <div className="dashboard-card">
        <h3>Trainings Assigned</h3>
        {trainings.length === 0 ? (
          <p>No trainings assigned.</p>
        ) : (
          <table>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Progress</th>
            </tr>
            {trainings.map((training, index) => (
              <tr>
                <td key={index}>{training.status}</td>
                <td key={index}>{training.name}</td>
                <td key={index}>{training.progress}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;

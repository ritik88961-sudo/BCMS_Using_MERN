import { useState, useEffect } from "react";
import "../../styles/post_login_styles/modules/taskManagement.css";

const TaskForm = () => {
  const username = localStorage.getItem("username");
  const [task, setTask] = useState({
    assigned_to: [],
    created_by: username,
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    due_date: "",
  });

  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/emp/employees");
        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tsk/tasks");
      const data = await res.json();
      setTasks(data);
      setIsTaskModalOpen(true); // Open modal after fetching tasks
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingTask
        ? `http://localhost:5000/api/tsk/tasks/${editingTask._id}`
        : "http://localhost:5000/api/tsk/tasks";
      const method = editingTask ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        setMessage(editingTask ? "Task Updated Successfully!" : "Task Created Successfully!");
        setTask({
          assigned_to: [],
          created_by: username,
          title: "",
          description: "",
          status: "Pending",
          priority: "Medium",
          due_date: "",
        });
        setEditingTask(null);
        fetchTasks();
      } else {
        setMessage("Error saving task!");
      }
    } catch (error) {
      setMessage("Server Error! Task not saved.");
    }
  };

  const handleEdit = (task) => {
    setTask(task);
    setEditingTask(task);
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/tsk/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Task Deleted Successfully!");
        fetchTasks();
      } else {
        setMessage("Error Deleting Task!");
      }
    } catch (error) {
      setMessage("Server Error! Task not deleted.");
    }
  };

  return (
    <main className="task-container">
      <h2>Task Management</h2>
      {message && <p className="message">{message}</p>}

      <button onClick={fetchTasks}>Show Tasks</button>

      <form onSubmit={handleSubmit}>
        <label>Assign To:</label>
        <button type="button" onClick={() => setIsEmployeeModalOpen(true)}>Select Employees</button>
        <p>Selected: {task.assigned_to.join(", ")}</p>

        <label>Created By:</label>
        <input type="text" value={username} disabled />

        <label>Title:</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={task.description} onChange={handleChange}></textarea>

        <label>Status:</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label>Priority:</label>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Due Date:</label>
        <input type="date" name="due_date" value={task.due_date} onChange={handleChange} />

        <button type="submit">{editingTask ? "Update Task" : "Create Task"}</button>
      </form>

      {isEmployeeModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select Employees</h3>
            {employees.map((emp) => (
              ((emp.manager_username === username || emp.username === username) ? 
              <div key={emp.id} className="employee-item">
                <span>{emp.username}</span>
                <input
                  type="checkbox"
                  checked={task.assigned_to.includes(emp.username)}
                  onChange={() => {
                    setTask((prev) => ({
                      ...prev,
                      assigned_to: prev.assigned_to.includes(emp.username)
                        ? prev.assigned_to.filter((name) => name !== emp.username)
                        : [...prev.assigned_to, emp.username],
                    }));
                  }}
                />
              </div>
               : "")
            ))}
            <button onClick={() => setIsEmployeeModalOpen(false)}>Done</button>
          </div>
        </div>
      )}

{isTaskModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h3>Task List</h3>
      <div className="task-list"> {/* Scrollable Container */}
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Created By</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="8">No tasks available.</td>
              </tr>
            ) : (
              tasks.map((t) => (
                (t.created_by === username ? 
                <tr key={t._id}>
                  <td>{t.title}</td>
                  <td>{t.assigned_to.join(", ")}</td>
                  <td>{t.created_by}</td>
                  <td>{t.description}</td>
                  <td>{t.status}</td>
                  <td>{t.priority}</td>
                  <td>{t.due_date}</td>
                  <td>
                    <button onClick={() => handleEdit(t)}>Edit</button>
                    <button onClick={() => handleDelete(t._id)}>Delete</button>
                  </td>
                </tr>
                : "")
              ))
            )}
          </tbody>
        </table>
      </div>
      <button onClick={() => setIsTaskModalOpen(false)}>Close</button>
    </div>
  </div>
)}

    </main>
  );
};

export default TaskForm;

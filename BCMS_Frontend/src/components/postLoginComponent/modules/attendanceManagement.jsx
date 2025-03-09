import { useState, useEffect } from "react";
import "../../styles/post_login_styles/modules/attendance.css";

const AttendanceManagement = () => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username")
  const [emp_username, setEmpUsername] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    fetchAttendanceRecords();
    fetchEmployees();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/attendance/records");
      const data = await res.json();
      setAttendanceRecords(data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/emp/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emp_username || !status || !date) {
      setError("Please provide employee username, status, and date.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emp_username, status, date }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMessage("Attendance marked successfully!");
        setError("");
        setEmpUsername("");
        setStatus("");
        setDate(new Date().toISOString().split("T")[0]);
        fetchAttendanceRecords();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleEdit = (record) => {
    setEditRecord(record);
  };

  const handleUpdate = async () => {
    if (!editRecord || !editRecord.status || !editRecord.date) return;
    const id = editRecord._id
    try {
      const response = await fetch(

        `http://localhost:5000/api/attendance/attendance/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: editRecord.status, date: editRecord.date }),
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMessage("Attendance updated successfully!");
        setEditRecord(null);
        fetchAttendanceRecords();
      }
    } catch (err) {
      setError("Error updating attendance.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/attendance/attendance/${id}`, {
        method: "DELETE",
      });
      setMessage("Attendance record deleted!");
      fetchAttendanceRecords();
    } catch (err) {
      setError("Error deleting record.");
    }
  };

  return (
    <div className="attendance-management-container">
      <div className="attendance-form-container">
        <form className="attendance-form" onSubmit={handleSubmit}>
          <select onChange={(e) => setEmpUsername(e.target.value)} value={emp_username} required>
            <option value="">Select Employee</option>
            {employees.map((ele) => (

              ((ele.manager_username === username || ele.username === username)? <option key={ele._id} value={ele.username}>{ele.username}</option> :"")
            ))}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Select Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <button type="submit">Mark Attendance</button>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
        </form>
      </div>

      <div className="attendance-list-container">
        <h3>Attendance Records</h3>
        <table className="attendance-list-table">
          <thead>
            <tr>
              <th>Employee Username</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.length > 0 ? attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.emp_username}</td>
                <td>{record.status}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(record)}>Edit</button>
                  <button onClick={() => handleDelete(record._id)}>Delete</button>
                </td>
              </tr>
            )) : ""}
          </tbody>
        </table>
      </div>

      {editRecord && (
        <div className="edit-popup">
          <h3>Edit Attendance</h3>
          <select
            value={editRecord.status}
            onChange={(e) => setEditRecord({ ...editRecord, status: e.target.value })}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>
          <input
            type="date"
            value={editRecord.date.split("T")[0]}
            onChange={(e) => setEditRecord({ ...editRecord, date: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditRecord(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;

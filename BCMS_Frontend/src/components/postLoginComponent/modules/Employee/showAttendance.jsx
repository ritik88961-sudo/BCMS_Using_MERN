import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "../../../styles/post_login_styles/modules/emp_att_recods.css";

const showAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [month, setMonth] = useState("");
  const username = localStorage.getItem("username")

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/attendance/${username}`);
        setAttendance(response.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    fetchAttendance();
  }, []);

  const filteredAttendance = month
    ? attendance.filter((item) => format(new Date(item.date), "yyyy-MM") === month)
    : attendance;

  return (
    <div className="Employee-attendance-container">
      <h2 className="title">Attendance for {username}</h2>
      <select className="filter-select" onChange={(e) => setMonth(e.target.value)}>
        <option value="">Filter by Month</option>
        {[...new Set(attendance.map((item) => format(new Date(item.date), "yyyy-MM")))].map((m) => (
          <option key={m} value={m}>{format(new Date(m + "-01"), "MMMM yyyy")}</option>
        ))}
      </select>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.map((record) => (
            <tr key={record._id}>
              <td>{format(new Date(record.date), "dd MMM yyyy")}</td>
              <td className={record.status === "Present" ? "present" : "absent"}>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default showAttendance;

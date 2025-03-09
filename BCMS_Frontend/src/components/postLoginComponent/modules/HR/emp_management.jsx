import { useState, useEffect } from "react";
import "../../../styles/post_login_styles/modules/employeeManagement.css"; // Importing CSS

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    department: "",
    position: "",
    date_of_joining: "",
    manager_username: "",
  });
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    createdAt: new Date().toLocaleString(),
  });

  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch Employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/emp/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle New User Input Change
  const handleUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle Edit Employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      username: employee.username,
      department: employee.department,
      position: employee.position,
      date_of_joining: employee.date_of_joining,
      manager_username: employee.manager_username,
    });
  };
  const handleDeleteEmployee = async (employee)=>{
    try {
      await fetch(`http://localhost:5000/api/emp/employees/${employee._id}`, {
        method: "DELETE",
      });
      alert("Employee Deleted")
      fetchEmployees();
    } catch (err) {
      alert("Error Deleting Employee")
    }
  }

  // Add or Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingEmployee ? "PUT" : "POST";
      const url = editingEmployee
        ? `http://localhost:5000/api/emp/employees/${editingEmployee._id}`
        : "http://localhost:5000/api/emp/employees";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) return alert(result.error);

      alert(
        editingEmployee
          ? "Employee updated successfully!"
          : "Employee added successfully!"
      );

      setFormData({
        username: "",
        department: "",
        position: "",
        date_of_joining: "",
        manager_username: "",
      });
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      alert(error.message);
    }
  };

  // Add New User
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const result = await res.json();
      if (!res.ok) return alert(result.error);

      alert("User added successfully!");
      setNewUser({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        role: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  // Close Modal
  const closeModal = () => {
    setEditingEmployee(null);
    setFormData({
      username: "",
      department: "",
      position: "",
      date_of_joining: "",
      manager_username: "",
    });
  };

  return (
    <div className="employee-container">
      <h2>👨‍💼 Employee Management</h2>
      <div className="employee-management">
        <div className="employee-add-box">
          <h3>➕ Add New Employee</h3>
          <form onSubmit={handleSubmit} className="employee-form">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date_of_joining"
              value={formData.date_of_joining}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="manager_username"
              placeholder="Manager Username"
              value={formData.manager_username}
              onChange={handleChange}
              required
            />
            <button type="submit">
              {editingEmployee ? "Update" : "Add"} Employee
            </button>
          </form>
        </div>

        <div className="user-add-box">
          <h3>➕ Add New User</h3>
          <form onSubmit={handleUserSubmit} className="user-form">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleUserChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleUserChange}
              required
            />
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={newUser.first_name}
              onChange={handleUserChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={newUser.last_name}
              onChange={handleUserChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleUserChange}
              required
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleUserChange}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Purchase Manager">Purchase Manager</option>
              <option value="Financial Analyst">Financial Analyst</option>
              <option value="IT Manager">IT Manager</option>
            </select>
            <button type="submit">Add User</button>
          </form>
        </div>
      </div>

      {/* Edit Employee Modal */}
      {editingEmployee && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Employee</h3>
            <form onSubmit={handleSubmit} className="employee-form">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date_of_joining"
                value={formData.date_of_joining}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="manager_username"
                placeholder="Manager Username"
                value={formData.manager_username}
                onChange={handleChange}
                required
              />
              <button type="submit">Update Employee</button>
            </form>
            <button className="close-modal" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
      <table className="employee-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Department</th>
            <th>Position</th>
            <th>Joining Date</th>
            <th>Manager Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.username}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>{emp.date_of_joining}</td>
              <td>{emp.manager_username}</td>
              <td>
                <button onClick={() => handleEditEmployee(emp)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(emp)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagement;

import "../../styles/globalStyles/register_login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken, setUserRole } from "../../../Contexts/Token/validateToken";
import { useDispatch } from "react-redux";
export default function RegisterLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message) => {
    setErrorMessage(message);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Employee");
  const [status, setStatus] = useState("Active");
  const [login, setLogin] = useState(true);
  const dispatch = useDispatch();
  const handleChange = () => {
    setLogin(!login);
  };
  const handleLoginAndRegister = (loginOrRegister) => {
    if (loginOrRegister === "register") {
      axios
        .post("http://localhost:5000/api/users/register", {
          username: username,
          email: email,
          first_name: firstName,
          last_name: lastName,
          status: status,
          createdAt: new Date().toISOString(),
          password: password,
          role: role,
        })
        .then((data) => {
          localStorage.setItem("token", data.data.token);
          dispatch(setToken(true));
          localStorage.setItem("role", data.data.role);
          // Navigate to the respective path based on the role
          console.log("Authenticated");
          navigate("/dashboard");
        })
        .catch((err) => showError(err.response.data.message));
    } else if (loginOrRegister === "login") {
      axios
        .post("http://localhost:5000/api/users/login", {
          username: username,
          password: password,
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("username", data.data.username);
          // Navigate to the respective path based on the role
          dispatch(setToken(true));
          localStorage.setItem("role", data.data.role);
          navigate("/dashboard");
        })
        .catch((err) => {
          showError(err.response.data.message);
          console.log(err);
        });
    }
  };
  return (
    <>
      <div className="login_register_form">
        <div>
          {isOpen && (
            <div className="error-dialog-overlay">
              <div className="error-dialog">
                <p>{errorMessage}</p>
                <button onClick={closeDialog}>Close</button>
              </div>
            </div>
          )}
        </div>
        <div className={`register ${login ? "" : "active_form"}`}>
          <form>
            <h2>Register</h2>

            <label htmlFor="username">Username: </label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password: </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="email">Email: </label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="first_name">First Name: </label>
            <input
              type="text"
              placeholder="First Name"
              id="first_name"
              name="first_name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              id="last_name"
              placeholder="Last Name"
              name="last_name"
              onChange={(e) => setLastName(e.target.value)}
            />

            <label htmlFor="role">Role</label>
            <select name="role" onChange={(e) => setRole(e.target.value)}>
              <option value={"Sales Manager"}>Sales Manager</option>
              <option value={"Purchase Manager"}>Purchase</option>
              <option value={"IT Manager"}>IT Manager</option>
              <option value={"Admin"}>Admin</option>
              <option value={"Employee"} selected>Employee</option>
              <option value={"HR"}>HR</option>
            </select>
            <label htmlFor="Status" id="status">
              Status
            </label>
            <select
              required
              name="status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active" selected>Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              type="submit"
              value="Submit"
              name="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLoginAndRegister("register");
              }}
            />
            <p>
              Already have an account:{" "}
              <span value="register" onClick={handleChange}>
                Login
              </span>
            </p>
          </form>
        </div>
        <div className={`login ${login ? "active_form" : ""}`}>
          <form>
            <h2>Login</h2>

            <label htmlFor="username">Username: </label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password: </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="submit"
              value="Submit"
              name="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLoginAndRegister("login");
              }}
            />

            <p>
              Don't have an account:{" "}
              <span value="register" onClick={handleChange}>
                Create account
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

import "../../../styles/post_login_styles/Dashboard/dashboard_header.css";
import logo from "../../../../assets/images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

export default function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [Active, setActive] = useState(false);
  const handleMenu = () => {
    setActive(!Active);
  };
  return (
    <>
      <div className="Dashboard_header">
        <div className="logo">
          <img src={logo} />
          <h2>BCMS</h2>
        </div>
        <div className="welcome_message">
          <h3>Welcome {localStorage.getItem("username")}</h3>
        </div>
        <div className="header-icons">
          <div className="user_icons">
            <div className="icon-item">
              <FaUser size={30} />
              <div className="user_profile"></div>
            </div>
            <button className="logout" onClick={handleLogout}>
              <FaSignOutAlt size={20} /> Logout
            </button>
          </div>
        </div>
        <div className="res_menu" onClick={handleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
}

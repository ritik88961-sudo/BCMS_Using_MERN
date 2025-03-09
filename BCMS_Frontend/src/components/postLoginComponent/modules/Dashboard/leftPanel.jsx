import "../../../styles/post_login_styles/Dashboard/left_panel.css";
import {
  FaHome,
  FaChartLine,
  FaFileAlt,
  FaCog,
  FaBell,
  FaUser,
  FaUserCog,
  FaClock,
  FaCalendarAlt,
  FaTasks,
  FaMoneyBillWave,
  FaEnvelope,
  FaBook,
  FaLifeRing,
  FaShoppingCart,
  FaShareAlt,
  FaChartBar,
  FaCheckCircle
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function LeftPanel({ role, setContent }) {
  console.log(role);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 720); // Check screen size
    };

    // Run on component mount and add resize listener
    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [Active, setActive] = useState(false);
  const handleLeftPanel = () => {
    setActive(!Active);
  };

  const getMenuItems = (role) => {
    const normalizedRole = role.toLowerCase(); // Normalize role to lowercase

    switch (normalizedRole) {
      case "admin":
        return [
          {
            icon: <FaHome size={20} />,
            label: "Admin Overview",
            link: "admin-overview",
          },
          { icon: <FaFileAlt size={20} />, label: "Reports", link: "reports" },
          {
            icon: <FaFileAlt size={20} />,
            label: "Items Remaining",
            link: "items-remaining",
          },
          { icon: <FaUser size={20} />, label: "Customers & Suppliers", link: "customers-suppliers" },
          {
            icon: <FaShareAlt size={20} />,
            label: "Share Document",
            link: "share-document",
          },
          {
            icon: <FaShareAlt size={20} />,
            label: "Send Message",
            link: "send-message",
          },
        ];
      case "sales manager":
        return [
          {
            icon: <FaHome size={20} />,
            label: "Sales Report",
            link: "sales-report",
          },
          {
            icon: <FaFileAlt size={20} />,
            label: "Items Remaining",
            link: "items-remaining",
          },
          {
            icon: <FaChartLine size={20} />,
            label: "Profit and Loss",
            link: "profit-loss",
          },
          { icon: <FaUser size={20} />, label: "Customers", link: "customers" },
          {
            icon: <FaShoppingCart size={20} />,
            label: "Record Sale",
            link: "record-sale",
          },
          {
            icon: <FaShareAlt size={20} />,
            label: "Share Document",
            link: "share-document",
          },
          {
            icon: <FaShareAlt size={20} />,
            label: "Send Message",
            link: "send-message",
          },
          {
            icon: <FaClock size={20} />,
            label: "Attendance Management",
            link: "attendance-management",
          },
          {
            icon: <FaCheckCircle size={20} />,
            label: "Task Management",
            link: "task-management",
          },
        ];

      case "purchase manager":
        return [
          {
            icon: <FaHome size={20} />,
            label: "Items Purchased",
            link: "items-purchased",
          },
          {
            icon: <FaFileAlt size={20} />,
            label: "Items Remaining",
            link: "items-remaining",
          },
          { icon: <FaUser size={20} />, label: "Suppliers", link: "suppliers" },
          {
            icon: <FaShoppingCart size={20} />,
            label: "Record Purchase",
            link: "record-item",
          },
          {
            icon: <FaShareAlt size={20} />,
            label: "Share Document",
            link: "share-document",
          },
          {
            icon: <FaShareAlt size={20} />,
            label: "Send Message",
            link: "send-message",
          },
          {
            icon: <FaClock size={20} />,
            label: "Attendance Management",
            link: "attendance-management",
          },
          {
            icon: <FaCheckCircle size={20} />,
            label: "Task Management",
            link: "task-management",
          },
        ];
      case "hr":
        return [
          {
            icon: <FaUser size={20} />,
            label: "Employee Management",
            link: "employee-management",
          },
          {
            icon: <FaClock size={20} />,
            label: "Attendance Management",
            link: "attendance-management",
          },
          {
            icon: <FaBook size={20} />,
            label: "Training & Development",
            link: "training-development",
          },
          {
            icon: <FaChartBar size={20} />,
            label: "Recruitment & Hiring",
            link: "recruitment",
          },
          {
            icon: <FaShareAlt size={20} />,
            label: "Share Document",
            link: "share-document",
          },
          {
            icon: <FaShareAlt size={20} />,
            label: "Send Message",
            link: "send-message",
          }
        ];
      case "employee":
        return [
          {
            icon: <FaUser size={20} />,
            label: "Dashboard",
            link: "emp-dashboard",
          },
          {
            icon: <FaClock size={20} />,
            label: "Attendance",
            link: "attendance",
          },
          {
            icon: <FaBook size={20} />,
            label: "Trainings",
            link: "trainings",
          },
          {
            icon: <FaChartBar size={20} />,
            label: "Jobs",
            link: "jobs",
          },
          {
            icon: <FaShareAlt size={20} />,
            label: "Share Document",
            link: "share-document",
          },
          {
            icon: <FaShareAlt size={20} />,
            label: "Send Message",
            link: "send-message",
          }
        ];

      default:
        return [
          { icon: <FaHome size={20} />, label: "Overview", link: "overview" },
          { icon: <FaChartLine size={20} />, label: "Sales", link: "sales" },
          { icon: <FaFileAlt size={20} />, label: "Reports", link: "reports" },
          { icon: <FaCog size={20} />, label: "Settings", link: "settings" },
        ];
    }
  };

  const menuItems = getMenuItems(role);

  const handleMenuClick = (content) => {
    setContent(content);
  };

  return (
    <div className="Left_Panel_container">
      <div className={`left-panel ${Active && isSmallScreen ? "active" : ""}`}>
        <div className="dashboard_menus">
          <h2>Dashboard</h2>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} onClick={() => handleMenuClick(item.link)}>
                <a href="#">
                  {item.icon}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="res_menus" onClick={handleLeftPanel}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

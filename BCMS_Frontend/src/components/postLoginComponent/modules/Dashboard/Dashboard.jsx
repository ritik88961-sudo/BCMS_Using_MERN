import DashboardHeader from "./dashboardheader";
import LeftPanel from "./leftPanel";
import MainSection from "./main_section";
import "../../../styles/post_login_styles/Dashboard/dashboard.css";
import { useState } from "react";
export default function Dashboard() {
  const userRole = localStorage.getItem("role");
  const [content, setContent] = useState("overview"); // Default content is "overview"
  console.log(userRole);
  return (
    <>
      <div className="dashboard">
        <DashboardHeader userRole={userRole} />
        <div className="dashboard_main_section">
          <LeftPanel role={userRole} setContent={setContent} />
          <MainSection content={content} />
        </div>
      </div>
    </>
  );
}

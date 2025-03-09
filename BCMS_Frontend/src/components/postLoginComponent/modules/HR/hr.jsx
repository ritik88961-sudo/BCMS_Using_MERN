import "../../../styles/post_login_styles/modules/hr.css";
import EmployeeManagement from "./emp_management";
import AttendanceManagement from "../attendanceManagement";
import FileUpload from "../Document_Sharing/shareDocument";
import TrainingPage from "./trainingAndDevelopment"
import Chat from "../Communication/Chat";
import Recruit from "./Recruit.jsx"

export default function HR({ mainContent }) {
  return (
    <>
      <main className="hr-container">
        {mainContent === "employee-management" || mainContent === "overview" ? (
          <EmployeeManagement />
        ) : (
          ""
        )}
        {mainContent === "attendance-management" ? (
          <AttendanceManagement />
        ) : (
          ""
        )}
        {mainContent === "share-document" ? <FileUpload /> : ""}
        {mainContent === "send-message" ? <Chat /> : ""}
        {mainContent === "training-development" ? <TrainingPage /> : ""}
        {mainContent === "recruitment" ? <Recruit /> : ""}
      </main>
    </>
  );
}

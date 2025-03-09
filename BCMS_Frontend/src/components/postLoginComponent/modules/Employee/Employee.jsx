import FileUpload from "../Document_Sharing/shareDocument";
import Chat from "../Communication/Chat";
import EmployeeDashboard from "./Emp_dashboard"
import ShowAttendance from "./showAttendance"
import ShowTrainings from "./ShowTrainings"
import ShowJobs from "./showJobs";
export default function Employee({ mainContent }) {
  // console.log(content);
  return (
    <>
      <main>
        <div className="sales-module">
          {mainContent === "overview" || mainContent === "emp-dashboard" ?<EmployeeDashboard />: ""}
          {mainContent === "attendance" ?<ShowAttendance />:""}
          {mainContent === "trainings" ? <ShowTrainings />:""}
          {mainContent === "jobs" ? <ShowJobs />:""}
          {mainContent === "share-document" ? <FileUpload />:""}
          {mainContent === "send-message" ?<Chat />:""}
        </div>
      </main>
    </>
  );
}

import "../../../styles/post_login_styles/modules/sales.css";
import SalesManagement from "./salesManagement";
import RemainingItems from "../Purchase/remainingItems";
import FetchCustomers from "./customers";
import SalesReport from "./salesReport";
import RecordSale from "./recordSale";
import FileUpload from "../Document_Sharing/shareDocument";
import Chat from "../Communication/Chat";
import AttendanceManagement from "../attendanceManagement"
import TaskManagement from "../taskManagement"
export default function Sales({ mainContent }) {
  // console.log(content);
  return (
    <>
      <main>
        <div className="sales-module">
          {mainContent === "overview" || mainContent === "sales-report" ? (
            <SalesManagement />
          ) : (
            ""
          )}
          {mainContent === "record-sale" ? <RecordSale /> : ""}
          {mainContent === "items-remaining" ? <RemainingItems /> : ""}
          {mainContent === "customers" ? <FetchCustomers /> : ""}
          {mainContent === "profit-loss" ? <SalesReport /> : ""}
          {mainContent === "share-document" ? <FileUpload /> : ""}
          {mainContent === "send-message" ? <Chat /> : ""}
          {mainContent === "attendance-management" ? <AttendanceManagement /> : ""}
          {mainContent === "task-management" ? <TaskManagement /> : ""}
        </div>
      </main>
    </>
  );
}

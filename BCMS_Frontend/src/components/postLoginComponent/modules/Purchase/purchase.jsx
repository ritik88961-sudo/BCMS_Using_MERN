import PurchaseForm from "./recordPurchase";
import RemainingItems from "./remainingItems";
import PurchaseList from "./itemsPurchased";
import Suppliers from "./supplier";
import FileUpload from "../Document_Sharing/shareDocument";
import Chat from "../Communication/Chat";
import AttendanceManagement from "../attendanceManagement"
import TaskManagement from "../taskManagement"
export default function Purchase({ mainContent }) {
  console.log(mainContent);
  // const [mainContent, setMainContent] = useState();
  return (
    <>
      {/* <h1>Purchase</h1> */}
      {mainContent === "items-purchased" || mainContent === "overview" ? (
        <PurchaseList />
      ) : (
        ""
      )}
      {mainContent === "items-remaining" ? <RemainingItems /> : ""}
      {mainContent === "total-items" ? <RemainingItems /> : ""}
      {mainContent === "record-item" ? <PurchaseForm /> : ""}
      {mainContent === "suppliers" ? <Suppliers /> : ""}
      {mainContent === "share-document" ? <FileUpload /> : ""}
      {mainContent === "send-message" ? <Chat /> : ""}
      {mainContent === "attendance-management" ? <AttendanceManagement /> : ""}
      {mainContent === "task-management" ? <TaskManagement /> : ""}
    </>
  );
}

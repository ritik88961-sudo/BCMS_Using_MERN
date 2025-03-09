import "../../../styles/post_login_styles/modules/hr.css";
import FileUpload from "../Document_Sharing/shareDocument";
import Chat from "../Communication/Chat";
import AdminDashboard from "./overview"
import AdminReport from "./report";
import ItemRemaining from "./itemRemaining"
import CustomersSuppliers from "./cusSup"
export default function HR({ mainContent }) {
  return (
    <>
      <main className="Admin-container">
        {mainContent === "admin-overview" || mainContent === "overview" ? (
          <AdminDashboard />
        ) : (
          ""
        )}
        {mainContent === "share-document" ? <FileUpload /> : ""}
        {mainContent === "send-message" ? <Chat /> : ""}
        {mainContent === "reports" ? <AdminReport /> : ""}
        {mainContent === "recruitment" ? <Recruit /> : ""}
        {mainContent === "items-remaining" ? <ItemRemaining /> : ""}
        {mainContent === "customers-suppliers" ? <CustomersSuppliers /> : ""}
      </main>
    </>
  );
}

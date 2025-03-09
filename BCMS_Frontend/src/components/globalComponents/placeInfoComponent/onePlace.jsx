import "../../styles/globalStyles/placeModule.css";
import hrImage from "../../../assets/images/hr.jpeg";
import financeImage from "../../../assets/images/finance.jpeg";
import salesImage from "../../../assets/images/sales.jpeg";
import purchaseImage from "../../../assets/images/purchase.png";
import marketingImage from "../../../assets/images/marketing.jpeg";
import ITImage from "../../../assets/images/IT.jpeg";
import communicationImage from "../../../assets/images/communication.jpeg";
import documentImage from "../../../assets/images/document.jpeg";
import PlaceModule from "./deptModule";
export default function Place() {
  return (
    <>
      <div className="place">
        <h2>
          The One place to all your
          <span> Projects, Teams, and Communications</span>
        </h2>
        <div className="place_item">
          <div className="place_para">
            <p>
              Our Business Collaboration Management System (BCMS) brings
              everything you need to manage your business operations into a
              single, easy-to-use platform. From organizing projects and
              coordinating teams to streamlining communication, BCMS helps you
              stay on top of every aspect of your business. Whether it's
              tracking tasks, sharing documents, or collaborating in real-time,
              BCMS ensures seamless connectivity, efficiency, and transparency,
              making it the ultimate solution for modern business management.
            </p>
          </div>
          <div className="place_info">
            <PlaceModule text="HR" image={hrImage} />
            <PlaceModule text="Finance" image={financeImage} />
            <PlaceModule text="Sales" image={salesImage} />
            <PlaceModule text="Purchase" image={purchaseImage} />
            <PlaceModule text="Marketing" image={marketingImage} />
            <PlaceModule text="IT" image={ITImage} />
            <PlaceModule text="Communication" image={communicationImage} />
            <PlaceModule text="Document Sharing" image={documentImage} />
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

import Card from "../components/globalComponents/card";
import toolsImage from "../assets/images/tools.png";
import teamImage from "../assets/images/team.jpeg";
import communicationImage from "../assets/images/communication.jpeg";
import Place from "../components/globalComponents/placeInfoComponent/onePlace.jsx";
import ContactForm from "../components/globalComponents/contactComponents/ContactForm.jsx";
import Hero from "../components/globalComponents/Hero.jsx";
export default function Home() {
  return (
    <>
      <main className="home">
        <Hero />
        <div className="overview">
          <h2>Overview of Business Collaboration Management System (BCMS)</h2>
          <div className="overview_item">
            <Card
              text="A Business Collaboration Management System (BCMS) is an integrated suite of tools designed to streamline and enhance collaboration within an organization."
              image={toolsImage}
            />
            <Card
              text="Whether you're managing team projects, tracking employee performance, or storing critical business documents, a BCMS can centralize and simplify all aspects of business collaboration, ensuring that your team stays connected."
              image={teamImage}
            />
            <Card
              text="By bringing together communication tools, file storage, task management, and real-time collaboration features, BCMS helps businesses reduce operational silos and promotes transparency."
              image={communicationImage}
            />
          </div>
        </div>
        <Place />
        <ContactForm />
      </main>
    </>
  );
}

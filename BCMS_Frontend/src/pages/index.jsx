import Home from "./home";
import Header from "../components/globalComponents/header.jsx";
import Footer from "../components/globalComponents/footer.jsx";
import Pricing from "./pricing.jsx";
import Features from "./features.jsx";
import Contact from "./contact.jsx";
import { useSelector } from "react-redux";
export default function Page() {
  const pageMainContent = useSelector((state) => state.page.value);
  return (
    <>
      <Header />
      {pageMainContent === "home" ? <Home /> : ""}
      {pageMainContent === "pricing" ? <Pricing /> : ""}
      {pageMainContent === "features" ? <Features /> : ""}
      {pageMainContent === "contact" ? <Contact /> : ""}
      <Footer />
    </>
  );
}

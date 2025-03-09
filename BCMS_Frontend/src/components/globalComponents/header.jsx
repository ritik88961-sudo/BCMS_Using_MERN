import "../styles/globalStyles/header.css";
import logo from "../../assets/images/logo.png";
import { useState, createContext } from "react";
import LoginRegisterForm from "./register_login/login_register_form";
import { useDispatch } from "react-redux";
import { setPage } from "../../Contexts/mainPage";
const loginContext = createContext();
export default function Header() {
  const updateQueryParams = (page) => {
    const newParams = new URLSearchParams();
    newParams.set("page", page);

    window.history.pushState({}, "", "?" + newParams.toString());
  };
  const dispatch = useDispatch();
  const [menuActive, setMenuActive] = useState(false);
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const handlePopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };
  return (
    <loginContext.Provider value={{ showLoginPopup, setShowLoginPopup }}>
      <header className="header_container">
        <div
          className="brand_logo"
          onClick={() => {
            dispatch(setPage("home"));
            updateQueryParams("home");
          }}
        >
          <a href="">
            <img src={logo} />
          </a>
        </div>
        <div className="brand_name">
          <h1>Business Management System</h1>
        </div>
        <nav>
          <div className={`menus ${menuActive ? "active_menu" : ""}`}>
            <ul className="navbar">
              <li
                className="navbar-item"
                onClick={() => {
                  dispatch(setPage("home"));
                  updateQueryParams("home");
                }}
              >
                <a href="#" className="nav-link">
                  Home
                </a>
              </li>
              <li
                className="navbar-item"
                onClick={() => {
                  dispatch(setPage("pricing"));
                  updateQueryParams("pricing");
                }}
              >
                <a href="#" className="nav-link">
                  Pricing
                </a>
              </li>
              <li
                className="navbar-item"
                onClick={() => {
                  dispatch(setPage("features"));
                  updateQueryParams("features");
                }}
              >
                <a href="#" className="nav-link">
                  Features
                </a>
              </li>
              <li
                className="navbar-item"
                onClick={() => {
                  dispatch(setPage("contact"));
                  updateQueryParams("contact");
                }}
              >
                <a href="#" className="nav-link">
                  Contact
                </a>
              </li>
              <li className="navbar-item login-btn">
                <span onClick={handlePopup}>Login</span>
              </li>
            </ul>
          </div>
          <div
            className={`hamburger ${menuActive ? "active_menu" : ""}`}
            id="hamburger"
            onClick={toggleMenu}
          >
            <span className={menuActive ? "active_menu" : ""}></span>
            <span className={menuActive ? "active_menu" : ""}></span>
            <span className={menuActive ? "active_menu" : ""}></span>
          </div>
        </nav>
        <LoginRegisterForm />
      </header>
    </loginContext.Provider>
  );
}
export { loginContext };

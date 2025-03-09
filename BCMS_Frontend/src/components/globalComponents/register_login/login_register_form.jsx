import "../../styles/globalStyles/register_login.css";
import RegisterLogin from "./register";
import { loginContext } from "../header";
import { useContext } from "react";
export default function LoginRegisterForm() {
  const { showLoginPopup, setShowLoginPopup } = useContext(loginContext);
  const handlePopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };
  return (
    <dialog
      className={`login_register_popup ${showLoginPopup ? "active_form" : ""}`}
    >
      <div className="close_Btn" onClick={handlePopup}>
        <span></span>
        <span></span>
      </div>
      <RegisterLogin />
    </dialog>
  );
}

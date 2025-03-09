import { useEffect, useState } from "react";
import Sales from "../Sales/sales";
import Purchase from "../Purchase/purchase";
import HR from "../HR/hr";
import Admin from "../Admin/admin";
import Employee from "../Employee/Employee"
export default function MainSection({ content }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <>
      {role === "Sales Manager" && <Sales mainContent={content} />}
      {role === "Purchase Manager" && <Purchase mainContent={content} />}
      {role === "Admin" && <Admin mainContent={content} />}
      {role === "HR" && <HR mainContent={content} />}
      {role === "IT" && <It mainContent={content} />}
      {role === "Employee" && <Employee mainContent={content} />}
      {!role && <h1>Invalid User!!!</h1>}{" "}
      {/* Default loading text when role is not set */}
    </>
  );
}

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// ProtectedRoute component to check user authentication and role
const ProtectedRoute = ({ element, requiredRole }) => {
  // Fetching the authentication status and user role from Redux store
  const isAuthenticated = useSelector((state) => state.token.value);
  const userRole = localStorage.getItem("role"); // user role from store or context
  console.log(userRole);

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If user role does not match the required role, redirect to error page
  if (userRole !== requiredRole) {
    return <Navigate to="/user-not-valid" />;
  }

  // If all conditions are met, render the requested element
  return element;
};

export default ProtectedRoute;

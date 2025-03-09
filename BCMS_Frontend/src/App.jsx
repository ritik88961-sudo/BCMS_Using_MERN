import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./Contexts/Token/validateToken";
import axios from "axios";
import Page from "./pages/index";
import Dashboard from "./components/postLoginComponent/modules/Dashboard/Dashboard";
function App() {
  const isAuthenticate = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Token validate karne ka function
  const validateToken = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/authenticate/validate-token",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.valid) {
        dispatch(setToken(true));
      } else {
        dispatch(setToken(false));
      }
    } catch (error) {
      console.error("Error validating token:", error);
      dispatch(setToken(false));
    } finally {
      setLoading(false); // Loading complete
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      validateToken(token);
    } else {
      dispatch(setToken(false));
      setLoading(false);
    }
  }, []); // Dependency array empty rakho taaki yeh sirf ek baar run ho

  // Jab tak loading ho, blank screen ya loader dikhao
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Page />} />
        <Route
          path="/"
          element={isAuthenticate ? <Navigate to="/dashboard" /> : <Page />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticate ? <Dashboard /> : <Page />}
        />
      </Routes>
    </Router>
  );
}

export default App;

import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./Contexts/store.js";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

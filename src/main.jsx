import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";  // ← change this
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>                                  {/* ← no basename needed */}
      <App />
    </HashRouter>
  </StrictMode>
);
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import RedirectUrl from "./components/redirect-url.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:id" element={<RedirectUrl />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/pages/Home.jsx";
import MoodTracker from "./components/pages/MoodTracker.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tracking" element={<MoodTracker />} />
    </Routes>
  </BrowserRouter>
  /* </StrictMode> */
);

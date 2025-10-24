import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router"; // Pastikan importnya dari 'react-router-dom'
import Home from "./components/pages/Home.jsx";
import MoodTracker from "./components/pages/MoodTracker.jsx";
import ScrollToTop from "./components/ui/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    {/* Tempatkan <ScrollToTop /> di dalam BrowserRouter
      agar bisa menggunakan hook useLocation()
    */}
    <ScrollToTop />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tracking" element={<MoodTracker />} />
    </Routes>
  </BrowserRouter>
  /* </StrictMode> */
);

import { Routes, Route, Navigate } from "react-router-dom";
import "./global.css";
import LoginPage from "./pages/LoginPage";
import HomePage  from "./pages/HomePage";
import PoemsPage from "./pages/PoemsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/"      element={<LoginPage />} />
      <Route path="/home"  element={<HomePage />} />
      <Route path="/poems" element={<PoemsPage />} />
      <Route path="*"      element={<Navigate to="/" replace />} />
    </Routes>
  );
}
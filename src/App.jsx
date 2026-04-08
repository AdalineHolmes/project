import { useState } from "react";
import "./global.css";
import LoginPage from "./pages/LoginPage";
import HomePage  from "./pages/HomePage";
import PoemsPage from "./pages/PoemsPage";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && <LoginPage onSuccess={() => setPage("home")} />}
      {page === "home"  && <HomePage  onNavigate={setPage} />}
      {page === "poems" && <PoemsPage onNavigate={setPage} />}
    </>
  );
}

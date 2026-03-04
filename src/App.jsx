// src/App.jsx
import { useEffect, useState } from "react";
import Menu from "./pages/Menu";
import ChefDashboard from "./pages/ChefDashboard";

export default function App() {
  const [page, setPage] = useState("menu");

  useEffect(() => {
    if (window.location.pathname === "/chef") setPage("chef");
  }, []);

  return page === "chef" ? <ChefDashboard /> : <Menu />;
}

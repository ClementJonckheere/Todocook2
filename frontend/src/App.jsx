// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./styles/app.css";
import "./styles/base/variables.css";
import "./styles/components/navbar.css";


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RecipesList from "./components/RecipesList";
import CreateRecipe from "./pages/CreateRecipe";
import Pantry from "./pages/Pantry";
import Suggestions from "./components/Suggestions";
import NutritionTracker from "./components/NutritionTracker";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutButton from "./components/LogoutButton";
import ThemeToggle from "./components/ThemeToggle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
  const themeFile = theme === "dark" ? "dark.css" : "light.css";
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `/src/styles/base/${themeFile}`;
  link.id = "theme-style";

  // Supprime l'ancien thème
  const existing = document.getElementById("theme-style");
  if (existing) {
    document.head.removeChild(existing);
  }

  document.head.appendChild(link);
}, [theme]);

  const NavLinks = () => (
    <>
      <Link to="/">Accueil</Link>
      <Link to="/login">Connexion</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/recipes">Recettes</Link>
      <Link to="/create">Créer une recette</Link>
      <Link to="/pantry">Mon garde-manger</Link>
      <Link to="/suggestions">Suggestions</Link>
      <Link to="/nutrition">Suivi nutritionnel</Link>
    </>
  );

  return (
    <Router>
      <header>
        <nav className="navbar">
          {isMobile ? (
            <Menu right>
              <NavLinks />
              <ThemeToggle />
              <LogoutButton />
            </Menu>
          ) : (
            <div className="navbar-desktop">
              <div className="nav-links"><NavLinks /></div>
              <div className="nav-actions">
                <ThemeToggle />
                <LogoutButton />
              </div>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<h1>Bienvenue sur TodoCook</h1>} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/recipes" element={<ProtectedRoute><RecipesList /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateRecipe /></ProtectedRoute>} />
          <Route path="/pantry" element={<ProtectedRoute><Pantry /></ProtectedRoute>} />
          <Route path="/suggestions" element={<ProtectedRoute><Suggestions /></ProtectedRoute>} />
          <Route path="/nutrition" element={<ProtectedRoute><NutritionTracker /></ProtectedRoute>} />
        </Routes>
      </main>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme={theme} />
    </Router>
  );
}

export default App;

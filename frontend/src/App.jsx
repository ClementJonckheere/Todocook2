import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RecipesList from "./components/RecipesList";
import CreateRecipe from "./pages/CreateRecipe";
import Pantry from "./pages/Pantry";
import Suggestions from "./components/Suggestions";
import NutritionTracker from "./components/NutritionTracker";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.css";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<h1>Bienvenue sur TodoCook</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/recipes" element={
            <ProtectedRoute><RecipesList /></ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute><CreateRecipe /></ProtectedRoute>
          } />
          <Route path="/pantry" element={
            <ProtectedRoute><Pantry /></ProtectedRoute>
          } />
          <Route path="/suggestions" element={
            <ProtectedRoute><Suggestions /></ProtectedRoute>
          } />
          <Route path="/nutrition" element={
            <ProtectedRoute><NutritionTracker /></ProtectedRoute>
          } />
          <Route path="/scanner" element={
            <ProtectedRoute><ScannerPage /></ProtectedRoute>
          } />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme={theme}
      />
    </Router>
  );
}

export default App;

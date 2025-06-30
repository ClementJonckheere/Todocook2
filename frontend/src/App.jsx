import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pantry from "./pages/Pantry";
import CreateRecipe from "./pages/CreateRecipe";
import NutritionTracker from "./components/NutritionTracker";
import ProtectedRoute from "./components/ProtectedRoute";
import BottomNavbar from "./components/Navbar/BottomNavbar";
import ScannerPage from "./pages/ScannerPage";
import Profil from "./pages/Profil";
import Calendar from "./pages/Calendar.jsx"; // ✅ bien importé

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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
            <BottomNavbar />
          </ProtectedRoute>
        } />
        <Route path="/scanner" element={
          <ProtectedRoute>
            <ScannerPage />
            <BottomNavbar />
          </ProtectedRoute>
        } />
        <Route path="/garde-manger" element={
          <ProtectedRoute>
            <Pantry />
            <BottomNavbar />
          </ProtectedRoute>
        } />
        <Route path="/profil" element={
          <ProtectedRoute>
            <Profil />
            <BottomNavbar />
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute>
            <CreateRecipe />
            <BottomNavbar />
          </ProtectedRoute>
        } />
        <Route path="/nutrition" element={
          <ProtectedRoute>
            <NutritionTracker />
            <BottomNavbar />
          </ProtectedRoute>
        } />
        <Route path="/calendrier" element={
          <ProtectedRoute>
            <Calendar />
            <BottomNavbar />
          </ProtectedRoute>
        } />
      </Routes>

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

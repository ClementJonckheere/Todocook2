import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";
import "../styles/components/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <button className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Accueil</Link>
        <Link to="/login" onClick={closeMenu}>Connexion</Link>
        <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
        <Link to="/recipes" onClick={closeMenu}>Recettes</Link>
        <Link to="/create" onClick={closeMenu}>Créer une recette</Link>
        <Link to="/pantry" onClick={closeMenu}>Mon garde-manger</Link>
        <Link to="/suggestions" onClick={closeMenu}>Suggestions</Link>
        <Link to="/nutrition" onClick={closeMenu}>Suivi nutritionnel</Link>
        <Link to="/scanner">Scanner</Link>

      </div>

      <div className="navbar-actions">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </nav>
  );
}

export default Navbar;

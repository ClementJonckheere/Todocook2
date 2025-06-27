import React, { useEffect, useState } from "react";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;

  // Sinon, utiliser la préférence système
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "☀️ Mode clair" : "🌙 Mode sombre"}
    </button>
  );
};

export default ThemeToggle;

import React, { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} style={{
      padding: "8px 16px",
      borderRadius: "8px",
      backgroundColor: "var(--cor-primaria)",
      color: "var(--cor-texto)",
      border: "none",
      cursor: "pointer",
    }}>
      {theme === "light" ? "🌙 Tema Escuro" : "☀️ Tema Claro"}
    </button>
  );
};

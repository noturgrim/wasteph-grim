import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("crm-theme");
    return savedTheme || "dark";
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("crm-theme", theme);

    // Apply theme to document
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    // Update body background
    if (theme === "dark") {
      document.body.style.backgroundColor = "#0a1f0f";
    } else {
      document.body.style.backgroundColor = "#ffffff";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

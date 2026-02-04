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
    // Use requestAnimationFrame to batch DOM updates
    requestAnimationFrame(() => {
      // Save theme to localStorage
      localStorage.setItem("crm-theme", theme);

      // Apply theme to document (Tailwind's dark mode)
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        document.body.style.backgroundColor = "#0a1f0f";
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
        document.body.style.backgroundColor = "#ffffff";
      }
    });
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

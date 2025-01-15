// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for theme state
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  // Use local storage to persist the theme choice across page reloads
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    // Store the theme choice in local storage
    localStorage.setItem("theme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);

import React, { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher";
import CharacterCounter from "./components/CharacterCounter";

function AppContent() {
  const { theme } = useContext(ThemeContext);

  const appStyles = {
    backgroundColor: theme === "light" ? "#f9f9f9" : "#222",
    color: theme === "light" ? "#000" : "#fff",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "0.5s",
  };

  return (
    <div style={appStyles}>
      <h1>🌗 Theme Switcher Example</h1>
      <ThemeSwitcher />
    </div>
  );
}

export default function App() {
  return (
    <div>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
      <CharacterCounter />
    </div>
  );
}

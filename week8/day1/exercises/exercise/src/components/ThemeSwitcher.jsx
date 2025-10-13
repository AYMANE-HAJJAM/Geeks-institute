import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeSwitcher() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: theme === "light" ? "#333" : "#f1f1f1",
                color: theme === "light" ? "#fff" : "#333",
                transition: "0.3s",
            }}
        >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
    );
}

export default ThemeSwitcher;

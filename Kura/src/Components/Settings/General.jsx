/** @format */

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../../Styles/General.css";

export default function General() {
  const [selectedTheme, setSelectedTheme] = useState("kurama");

  // Theme options with preview colors - memoized to prevent re-renders
  const themes = useMemo(
    () => [
      {
        id: "kurama",
        name: "Kurama Orange",
        description: "Original fiery orange theme",
        primaryColor: "#ff7849",
        secondaryColor: "#e55a2b",
        accentColor: "#f39c12",
        preview: "linear-gradient(135deg, #ff7849 0%, #e55a2b 100%)",
      },
      {
        id: "sasuke",
        name: "Sasuke Purple",
        description: "Dark purple with electric blue accents",
        primaryColor: "#6b46c1",
        secondaryColor: "#553c9a",
        accentColor: "#3b82f6",
        preview: "linear-gradient(135deg, #6b46c1 0%, #553c9a 100%)",
      },
      {
        id: "naruto",
        name: "Naruto Blue",
        description: "Bright blue with golden accents",
        primaryColor: "#3b82f6",
        secondaryColor: "#2563eb",
        accentColor: "#f59e0b",
        preview: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      },
      {
        id: "sakura",
        name: "Sakura Pink",
        description: "Soft pink with coral tones",
        primaryColor: "#ec4899",
        secondaryColor: "#db2777",
        accentColor: "#f97316",
        preview: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
      },
      {
        id: "kakashi",
        name: "Kakashi Silver",
        description: "Cool silver with blue highlights",
        primaryColor: "#64748b",
        secondaryColor: "#475569",
        accentColor: "#06b6d4",
        preview: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
      },
      {
        id: "itachi",
        name: "Itachi Crimson",
        description: "Deep red with dark crimson",
        primaryColor: "#dc2626",
        secondaryColor: "#b91c1c",
        accentColor: "#f59e0b",
        preview: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
      },
    ],
    []
  );

  // Apply theme to CSS variables - memoized callback
  const applyTheme = useCallback(
    (themeId) => {
      const theme = themes.find((t) => t.id === themeId);
      if (theme) {
        const root = document.documentElement;
        root.style.setProperty("--kurama-orange", theme.primaryColor);
        root.style.setProperty("--kurama-dark-orange", theme.secondaryColor);
        root.style.setProperty("--kurama-gold", theme.accentColor);

        // Also update some additional theme variables for immediate effect
        root.style.setProperty("--primary-color", theme.primaryColor);
        root.style.setProperty("--secondary-color", theme.secondaryColor);
        root.style.setProperty("--accent-color", theme.accentColor);

        // Save theme preference
        localStorage.setItem("kurawind-theme", themeId);
      }
    },
    [themes]
  );

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("kurawind-theme");
    if (savedTheme && themes.find((t) => t.id === savedTheme)) {
      setSelectedTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, [themes, applyTheme]);

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    applyTheme(themeId);
  };

  return (
    <div className="general-settings">
      <div className="settings-section">
        <h3 className="section-title">Color Theme</h3>
        <p className="section-description">
          Choose your favorite color theme to personalize your KuraWind
          experience
        </p>

        <div className="theme-grid">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`theme-card ${
                selectedTheme === theme.id ? "selected" : ""
              }`}
              onClick={() => handleThemeChange(theme.id)}>
              <div
                className="theme-preview"
                style={{ background: theme.preview }}>
                {selectedTheme === theme.id && (
                  <div className="selected-indicator">
                    <AiOutlineCheck size={20} />
                  </div>
                )}
              </div>
              <div className="theme-info">
                <h4 className="theme-name">{theme.name}</h4>
                <p className="theme-description">{theme.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Display Mode</h3>
        <p className="section-description">Adjust how content is displayed</p>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Glassmorphism Effects</h4>
            <p>Enable blur and transparency effects</p>
          </div>
          <div className="setting-control">
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Animations</h4>
            <p>Enable smooth transitions and animations</p>
          </div>
          <div className="setting-control">
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Reduced Motion</h4>
            <p>Minimize animations for better accessibility</p>
          </div>
          <div className="setting-control">
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Language & Region</h3>
        <p className="section-description">
          Set your preferred language and region
        </p>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Language</h4>
            <p>Choose your preferred language</p>
          </div>
          <div className="setting-control">
            <select className="setting-select">
              <option value="en">English</option>
              <option value="ne">नेपाली (Nepali)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ja">日本語 (Japanese)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

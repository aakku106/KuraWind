/** @format */

import React, { useState } from "react";
import {
  AiOutlineUser,
  AiFillSetting,
  AiFillInfoCircle,
  AiFillBell,
  AiFillLock,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import General from "./Settings/General";

function Settings() {
  const [currentView, setCurrentView] = useState("main"); // main, general, profile, etc.

  const user = JSON.parse(localStorage.getItem("currentUser")) || {
    name: "User",
    status: "online",
  };

  const settingsItems = [
    {
      icon: <AiOutlineUser />,
      title: "Profile",
      subtitle: "Update your profile information",
      action: () => setCurrentView("profile"),
    },
    {
      icon: <AiFillBell />,
      title: "Notifications",
      subtitle: "Message and call notifications",
      action: () => setCurrentView("notifications"),
    },
    {
      icon: <AiFillLock />,
      title: "Privacy",
      subtitle: "Block contacts and groups",
      action: () => setCurrentView("privacy"),
    },
    {
      icon: <AiFillSetting />,
      title: "General",
      subtitle: "Theme, language, and more",
      action: () => setCurrentView("general"),
    },
    {
      icon: <AiFillInfoCircle />,
      title: "About",
      subtitle: "App version and info",
      action: () => setCurrentView("about"),
    },
  ];

  // Render different views based on current selection
  if (currentView === "general") {
    return (
      <div className="settings-container">
        <div className="settings-header">
          <button
            className="back-button"
            onClick={() => setCurrentView("main")}>
            <AiOutlineArrowLeft size={20} />
          </button>
          <h2 className="settings-title">General Settings</h2>
        </div>
        <General />
      </div>
    );
  }

  // Main settings view
  return (
    <div className="settings-container">
      {/* User Profile Section */}
      <div className="settings-profile">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-info">
          <h3>{user.name}</h3>
          <p className="profile-status">{user.status}</p>
        </div>
      </div>

      {/* Settings Items */}
      <div className="settings-items">
        {settingsItems.map((item, index) => (
          <div key={index} className="settings-item" onClick={item.action}>
            <div className="settings-item-icon">{item.icon}</div>
            <div className="settings-item-content">
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
            </div>
            <div className="settings-item-arrow">›</div>
          </div>
        ))}
      </div>

      <div className="settings-footer">
        <p>Kura Messenger v1.0.0</p>
        <p>Built with ❤️ and React</p>
      </div>
    </div>
  );
}

export default Settings;

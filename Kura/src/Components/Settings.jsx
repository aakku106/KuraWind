/** @format */

import React from "react";
import {
  AiOutlineUser,
  AiFillSetting,
  AiFillInfoCircle,
  AiFillBell,
  AiFillLock,
} from "react-icons/ai";

function Settings() {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {
    name: "User",
    status: "online",
  };

  const settingsItems = [
    {
      icon: <AiOutlineUser />,
      title: "Profile",
      subtitle: "Update your profile information",
      action: () => console.log("Profile clicked"),
    },
    {
      icon: <AiFillBell />,
      title: "Notifications",
      subtitle: "Message and call notifications",
      action: () => console.log("Notifications clicked"),
    },
    {
      icon: <AiFillLock />,
      title: "Privacy",
      subtitle: "Block contacts and groups",
      action: () => console.log("Privacy clicked"),
    },
    {
      icon: <AiFillSetting />,
      title: "General",
      subtitle: "Theme, language, and more",
      action: () => console.log("General clicked"),
    },
    {
      icon: <AiFillInfoCircle />,
      title: "About",
      subtitle: "App version and info",
      action: () => console.log("About clicked"),
    },
  ];

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

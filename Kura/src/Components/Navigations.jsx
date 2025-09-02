/** @format */

import React, { Suspense, lazy } from "react";
import "../Styles/Navigations.css";

// Lazy load icons for better performance
const AiFillHome = lazy(() =>
  import("react-icons/ai").then((module) => ({ default: module.AiFillHome }))
);
const GiThreeFriends = lazy(() =>
  import("react-icons/gi").then((module) => ({
    default: module.GiThreeFriends,
  }))
);
const AiFillSetting = lazy(() =>
  import("react-icons/ai").then((module) => ({ default: module.AiFillSetting }))
);

// Icon fallback component
const IconFallback = () => (
  <div
    style={{
      width: "24px",
      height: "24px",
      background: "rgba(255, 120, 73, 0.3)",
      borderRadius: "4px",
      animation: "pulse 1.5s ease-in-out infinite",
    }}
  />
);

export default function Navigations({
  activeTab,
  setActiveTab,
  chats,
  friends,
}) {
  const navItems = [
    {
      id: "chats",
      icon: AiFillHome,
      label: "Chats",
      badge: chats ? chats.filter((chat) => chat.unreadCount > 0).length : 0,
    },
    {
      id: "friends",
      icon: GiThreeFriends,
      label: "Friends",
      badge: friends ? friends.filter((friend) => friend.online).length : 0,
    },
    {
      id: "settings",
      icon: AiFillSetting,
      label: "Settings",
    },
  ];

  return (
    <section className="nav-container">
      <div className="nav-dock">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}>
              <div className="nav-icon-wrapper">
                <Suspense fallback={<IconFallback />}>
                  <IconComponent size={24} />
                </Suspense>
                {item.badge > 0 && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </div>
              <span className="nav-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** @format */

import React from "react";
import { AiFillHome } from "react-icons/ai";
import { GiThreeFriends } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";
import "../Styles/Navigations.css";

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
                <IconComponent size={24} />
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

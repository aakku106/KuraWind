/** @format */

import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { GiThreeFriends } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";
import "../Styles/Navigations.css";

export default function Navigations() {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: AiFillHome, label: "Home" },
    { id: "friends", icon: GiThreeFriends, label: "Friends" },
    { id: "settings", icon: AiFillSetting, label: "Settings" },
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
              </div>
              <span className="nav-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

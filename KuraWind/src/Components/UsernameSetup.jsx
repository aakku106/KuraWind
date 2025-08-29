/** @format */

import React, { useState } from "react";

function UsernameSetup({ onUsernameSet }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    // Save username to localStorage
    localStorage.setItem("kurawind-username", username.trim());
    onUsernameSet(username.trim());
  };

  return (
    <div className="username-setup">
      <div className="setup-container">
        <div className="logo">
          <h1>🌬️ KuraWind</h1>
          <p>Privacy-first messenger</p>
        </div>

        <div className="setup-form">
          <h2>Choose Your Username</h2>
          <p>Your username is stored locally and never sent to our servers.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
              className="username-input"
              maxLength={20}
              required
            />
            <button type="submit" className="start-button">
              Start Chatting
            </button>
          </form>
        </div>

        <div className="privacy-note">
          <p>🔒 Your messages are stored locally on your device</p>
          <p>
            🗑️ Messages are automatically deleted from our servers after
            delivery
          </p>
        </div>
      </div>
    </div>
  );
}

export default UsernameSetup;

/** @format */

import React, { useState, Suspense, lazy } from "react";
import { friends, getChatsForUser } from "../Data/chats";
import { clearAllChatHistory } from "../Data/messages";
import Navigations from "./Navigations";
import "../Styles/Settings.css";

// Lazy load Settings component
const Settings = lazy(() => import("./Settings"));

// Loading component for Settings
const SettingsLoader = () => (
  <div
    style={{
      padding: "2rem",
      textAlign: "center",
      color: "var(--text-primary)",
    }}>
    <div className="loading-dots">
      <span>•</span>
      <span>•</span>
      <span>•</span>
    </div>
    <p style={{ marginTop: "1rem", opacity: "0.7" }}>Loading Settings...</p>
  </div>
);

function Home({ user, onLogout, onOpenChat }) {
  const [activeTab, setActiveTab] = useState("chats"); // chats or friends

  // Get user-specific chats (includes real-time chat for aakku and ccn)
  const userChats = getChatsForUser(user);

  const handleChatClick = (chat) => {
    onOpenChat(chat);
  };

  const handleFriendClick = (friend) => {
    // Convert friend to chat format and open chat
    const friendChat = {
      id: friend.id,
      friendName: friend.name,
      avatar: friend.avatar,
      online: friend.online,
      lastMessage: "",
      timestamp: "now",
      unreadCount: 0,
    };
    onOpenChat(friendChat);
  };

  const handleClearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all chat history? This action cannot be undone."
      )
    ) {
      const success = clearAllChatHistory();
      if (success) {
        alert("Chat history cleared successfully!");
        // Force a refresh to show updated messages
        window.location.reload();
      } else {
        alert("Failed to clear chat history. Please try again.");
      }
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <div className="header-left">
          <h1 className="app-title">KuraWind</h1>
          <p className="welcome-text">Welcome, {user.userName}!</p>
        </div>
        <div className="header-actions">
          <button
            onClick={handleClearHistory}
            className="clear-history-btn"
            title="Clear Chat History">
            🗑️
          </button>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      {/* <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "chats" ? "active" : ""}`}
          onClick={() => setActiveTab("chats")}>
          Chats ({chats.filter((chat) => chat.unreadCount > 0).length})
        </button>
        <button
          className={`tab-btn ${activeTab === "friends" ? "active" : ""}`}
          onClick={() => setActiveTab("friends")}>
          Friends ({friends.filter((friend) => friend.online).length} online)
        </button>
      </div> */}

      {/* Content */}
      <div className="home-content">
        {activeTab === "chats" ? (
          <div className="chats-list">
            {userChats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${
                  chat.isRealTime ? "real-time-chat" : ""
                }`}
                onClick={() => handleChatClick(chat)}>
                <div className="avatar-container">
                  <div className="avatar">{chat.avatar}</div>
                  {chat.online && <div className="online-indicator"></div>}
                  {chat.isRealTime && (
                    <div className="realtime-indicator">⚡</div>
                  )}
                </div>
                <div className="chat-content">
                  <div className="chat-header">
                    <span className="friend-name">{chat.friendName}</span>
                    <span className="timestamp">{chat.timestamp}</span>
                  </div>
                  <div className="last-message">{chat.lastMessage}</div>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="unread-badge">{chat.unreadCount}</div>
                )}
              </div>
            ))}
          </div>
        ) : activeTab === "friends" ? (
          <div className="friends-list">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="friend-item"
                onClick={() => handleFriendClick(friend)}>
                <div className="avatar-container">
                  <div className="avatar">{friend.avatar}</div>
                  {friend.online && <div className="online-indicator"></div>}
                </div>
                <div className="friend-info">
                  <span className="friend-name">{friend.name}</span>
                  <span
                    className={`status ${
                      friend.online ? "online" : "offline"
                    }`}>
                    {friend.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="settings-view">
            <Suspense fallback={<SettingsLoader />}>
              <Settings />
            </Suspense>
          </div>
        )}

        <Navigations
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          chats={userChats}
          friends={friends}
        />
      </div>
    </div>
  );
}

export default Home;

/** @format */

import React, { useState } from "react";
import { chats, friends } from "../Data/chats";
import { clearAllChatHistory } from "../Data/messages";

function Home({ user, onLogout, onOpenChat }) {
  const [activeTab, setActiveTab] = useState("chats"); // chats or friends

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
      <div className="tab-navigation">
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
      </div>

      {/* Content */}
      <div className="home-content">
        {activeTab === "chats" ? (
          <div className="chats-list">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="chat-item"
                onClick={() => handleChatClick(chat)}>
                <div className="avatar-container">
                  <div className="avatar">{chat.avatar}</div>
                  {chat.online && <div className="online-indicator"></div>}
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
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Home;

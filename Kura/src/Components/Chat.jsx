/** @format */

import React, { useState, useRef, useEffect } from "react";
import { getChatMessages, addMessage } from "../Data/messages";

function Chat({ chatId, friendName, friendAvatar, friendOnline, onBack }) {
  const [messages, setMessages] = useState(getChatMessages(chatId));
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const message = addMessage(chatId, newMessage.trim());
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <button onClick={onBack} className="back-btn">
          ←
        </button>
        <div className="chat-header-info">
          <div className="avatar-container">
            <div className="avatar small">{friendAvatar}</div>
            {friendOnline && <div className="online-indicator small"></div>}
          </div>
          <div className="friend-details">
            <h3 className="friend-name">{friendName}</h3>
            <span className={`status ${friendOnline ? "online" : "offline"}`}>
              {friendOnline ? "Online" : "Last seen recently"}
            </span>
          </div>
        </div>
        <div className="chat-actions">
          <button className="action-btn">📞</button>
          <button className="action-btn">📹</button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.isOwn ? "own" : "other"}`}>
              <div
                className={`message-bubble ${message.isOwn ? "own" : "other"}`}>
                <div className="message-content">{message.message}</div>
                <div className="message-time">
                  {message.timestamp}
                  {message.isOwn && <span className="message-status">✓✓</span>}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="message-input-container">
        <form onSubmit={handleSendMessage} className="message-form">
          <div className="input-wrapper">
            <button type="button" className="attachment-btn">
              📎
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="message-input"
            />
            <button type="button" className="emoji-btn">
              😊
            </button>
          </div>
          <button
            type="submit"
            className={`send-btn ${newMessage.trim() ? "active" : ""}`}
            disabled={!newMessage.trim()}>
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;

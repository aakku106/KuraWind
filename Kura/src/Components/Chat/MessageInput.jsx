/** @format */

import React, { useState } from "react";
import { addMessage } from "../../Data/messages";

function MessageInput({ chatId, currentUser, onMessageSent }) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const success = addMessage(chatId, {
        message: newMessage.trim(),
        senderId: currentUser?.id || "current-user",
        senderName: currentUser?.userName || "You",
      });

      if (success) {
        setNewMessage("");
        // Notify parent component that a message was sent
        if (onMessageSent) {
          onMessageSent();
        }
      }
    }
  };

  return (
    <div className="message-input-container">
      <form className="message-form" onSubmit={handleSendMessage}>
        <div className="input-wrapper">
          <button type="button" className="attachment-btn">
            📎
          </button>
          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="button" className="emoji-btn">
            🦊
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
  );
}

export default MessageInput;

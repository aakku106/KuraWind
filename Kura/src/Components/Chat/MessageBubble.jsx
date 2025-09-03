/** @format */

import React from "react";

function MessageBubble({ message, isOwn }) {
  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    // If it's already a formatted string, return as is
    if (typeof timestamp === "string") {
      return timestamp;
    }

    // If it's a Date object, format it
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  // Defensive programming - handle both old and new message formats
  const messageContent =
    typeof message === "string"
      ? message
      : message.message || message.content || "";

  const messageTimestamp = typeof message === "string" ? "" : message.timestamp;

  return (
    <div className={`message-wrapper ${isOwn ? "own" : "other"}`}>
      <div className={`message-bubble ${isOwn ? "own" : "other"}`}>
        <div className="message-content">{messageContent}</div>
        <div className="message-time">
          {formatTime(messageTimestamp)}
          {isOwn && (
            <span className="message-status">
              {message.status === "sent" ? "✓" : "✓✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;

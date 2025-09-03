/** @format */

import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

function ChatHeader({
  friendName,
  friendAvatar,
  friendOnline,
  onBack,
  onClearHistory,
}) {
  return (
    <div className="chat-header">
      <button className="back-btn" onClick={onBack}>
        <AiOutlineArrowLeft size={24} />
      </button>

      <div className="chat-header-info">
        <div className="avatar-container">
          <div className="avatar small">{friendAvatar}</div>
          {friendOnline && <div className="online-indicator small"></div>}
        </div>

        <div className="friend-details">
          <span className="friend-name">{friendName}</span>
          <span className={`status ${friendOnline ? "online" : "offline"}`}>
            {friendOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className="chat-actions">
        <button
          onClick={onClearHistory}
          className="action-btn clear-history"
          title="Clear Chat History">
          🗑️
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;

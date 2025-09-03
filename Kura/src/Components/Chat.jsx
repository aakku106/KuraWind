/** @format */

import React, { useState, useRef } from "react";
import { clearChatHistory } from "../Data/messages";
import ChatHeader from "./Chat/ChatHeader";
import MessagesList from "./Chat/MessagesList";
import MessageInput from "./Chat/MessageInput";

function Chat({ chatId, friendName, friendAvatar, friendOnline, onBack }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const messagesListRef = useRef(null);

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("kurawind-user")) || {
    id: "current-user",
    userName: "You",
  };

  const handleClearHistory = () => {
    if (
      window.confirm(
        `Are you sure you want to clear all chat history with ${friendName}? This action cannot be undone.`
      )
    ) {
      const success = clearChatHistory(chatId, friendName);
      if (success) {
        // Force refresh of messages by updating key
        setRefreshKey((prev) => prev + 1);
        alert("Chat history cleared successfully!");
      } else {
        alert("Failed to clear chat history. Please try again.");
      }
    }
  };

  const handleMessageSent = () => {
    // Force refresh of messages when a new message is sent
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="chat-container">
      <ChatHeader
        friendName={friendName}
        friendAvatar={friendAvatar}
        friendOnline={friendOnline}
        onBack={onBack}
        onClearHistory={handleClearHistory}
      />

      <MessagesList
        key={refreshKey} // Force re-render when refreshKey changes
        chatId={chatId}
        currentUser={currentUser}
        ref={messagesListRef}
      />

      <MessageInput
        chatId={chatId}
        currentUser={currentUser}
        onMessageSent={handleMessageSent}
      />
    </div>
  );
}

export default Chat;

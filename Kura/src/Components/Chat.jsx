/** @format */

import React, { useState, useRef, useEffect, useMemo } from "react";
import { clearChatHistory, addReceivedMessage } from "../Data/messages";
import ablyService from "../Data/ablyService";
import ChatHeader from "./Chat/ChatHeader";
import MessagesList from "./Chat/MessagesList";
import MessageInput from "./Chat/MessageInput";

function Chat({ chatId, friendName, friendAvatar, friendOnline, onBack }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const messagesListRef = useRef(null);

  // Get current user from localStorage
  const currentUser = useMemo(() => {
    return (
      JSON.parse(localStorage.getItem("kurawind-user")) || {
        id: "current-user",
        userName: "You",
      }
    );
  }, []);

  // Initialize Ably service and subscribe to real-time messages
  useEffect(() => {
    // Initialize Ably service with current user
    ablyService.init(currentUser);

    // Subscribe to real-time messages for this chat
    const handleReceivedMessage = (messageData) => {
      // Add received message to local storage
      addReceivedMessage(chatId, messageData);
      // Trigger refresh to show new message
      setRefreshKey((prev) => prev + 1);
    };

    // Subscribe to messages if real-time is available
    ablyService.subscribeToChat(chatId, chatId, handleReceivedMessage);

    // Cleanup on unmount
    return () => {
      ablyService.unsubscribe();
    };
  }, [chatId, currentUser]);

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
        chatId={chatId}
        currentUser={currentUser}
        refreshTrigger={refreshKey} // Pass as prop instead of key
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

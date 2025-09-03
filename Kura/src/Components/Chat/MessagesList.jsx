/** @format */

import React, { useState, useRef, useEffect } from "react";
import { getChatMessages } from "../../Data/messages";
import MessageBubble from "./MessageBubble";

function MessagesList({ chatId, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Load messages
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      // Simulate network delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));
      const chatMessages = getChatMessages(chatId);
      setMessages(chatMessages);
      setIsLoading(false);
    };

    loadMessages();
  }, [chatId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      // Try immediate scroll
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }

      // Also try with a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
        // Also try direct scroll on container as backup
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [messages.length, isLoading]);

  if (isLoading) {
    return (
      <div className="messages-container" ref={messagesContainerRef}>
        <div className="messages-list">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
              color: "var(--text-secondary, rgba(44, 62, 80, 0.6))",
            }}>
            <div className="loading-dots">
              <span>•</span>
              <span>•</span>
              <span>•</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-container" ref={messagesContainerRef}>
      <div className="messages-list">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start the conversation! 👋</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === currentUser?.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default MessagesList;

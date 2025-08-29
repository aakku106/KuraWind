/** @format */

import React, { useEffect, useRef } from "react";
import { formatTimestamp } from "../utils";

function ChatBox({ messages, currentUser }) {
  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatBoxRef}>
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>💬 No messages yet</p>
            <p>Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.senderId === currentUser?.uid;
            return (
              <div 
                key={msg.id} 
                className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}
              >
                <div className="message-header">
                  <span className="username">{msg.senderName}</span>
                  <span
                    className="timestamp"
                    title={new Date(msg.timestamp).toLocaleString()}>
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ChatBox;

/** @format */

import React, { useState } from "react";

function InputBox({ onSendMessage, disabled = false }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;

    onSendMessage(text);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-group">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Reconnecting..." : "Type your message..."}
            className="message-input"
            maxLength={500}
            disabled={disabled}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!text.trim() || disabled}>
            {disabled ? "🔄" : "📤"}
          </button>
        </div>
      </form>
      <div className="input-info">
        <span className="char-count">{text.length}/500</span>
      </div>
    </div>
  );
}

export default InputBox;

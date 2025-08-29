/** @format */

// Utility functions for KuraWind

export const showNotification = (title, body) => {
  // Check if notifications are supported and permitted
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/vite.svg",
      tag: "kurawind-message",
    });
  }
};

export const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return Notification.permission === "granted";
  }
  return false;
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
};

export const exportChatHistory = (messages) => {
  const chatData = {
    exported: new Date().toISOString(),
    app: "KuraWind",
    version: "1.0.0",
    messages: messages.map((msg) => ({
      user: msg.user,
      text: msg.text,
      timestamp: msg.timestamp,
      date: new Date(msg.timestamp).toISOString(),
    })),
  };

  const dataStr = JSON.stringify(chatData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `kurawind-chat-${
    new Date().toISOString().split("T")[0]
  }.json`;
  link.click();

  URL.revokeObjectURL(url);
};

export const importChatHistory = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (data.app === "KuraWind" && Array.isArray(data.messages)) {
          resolve(data.messages);
        } else {
          reject(new Error("Invalid KuraWind chat file"));
        }
      } catch {
        reject(new Error("Failed to parse chat file"));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};

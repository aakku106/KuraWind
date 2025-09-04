/** @format */

import { Realtime } from "ably";

class AblyService {
  constructor() {
    // Initialize Ably with the API key from environment variables
    this.ably = new Realtime({
      key: import.meta.env.VITE_ABLY_API_KEY,
      clientId: null, // Will be set when user logs in
    });

    this.currentChannel = null;
    this.currentUser = null;
    this.messageCallbacks = new Set();
  }

  // Initialize the service with user info
  init(user) {
    this.currentUser = user;
    this.ably.auth.requestToken({ clientId: user.userName });
  }

  // Check if real-time messaging is available for this user
  isRealTimeAvailable(userId, targetUserId) {
    const realTimeUsers = ["aakku", "ccn"];
    const currentUserName = this.currentUser?.userName;

    // Only enable real-time for aakku and ccn communicating with each other
    return (
      realTimeUsers.includes(currentUserName) &&
      ((currentUserName === "aakku" && targetUserId === 2) || // ccn's id
        (currentUserName === "ccn" && targetUserId === 1)) // aakku's id
    );
  }

  // Get channel name for two users
  getChannelName(userId1, userId2) {
    // Always use the same channel name regardless of order
    const sortedIds = [userId1, userId2].sort();
    return `chat:${sortedIds[0]}-${sortedIds[1]}`;
  }

  // Subscribe to messages for a specific chat
  subscribeToChat(chatId, targetUserId, callback) {
    if (!this.isRealTimeAvailable(this.currentUser?.id, targetUserId)) {
      console.log("Real-time messaging not available for this chat");
      return null;
    }

    const channelName = this.getChannelName(this.currentUser.id, targetUserId);

    // Unsubscribe from previous channel if exists
    if (this.currentChannel) {
      this.currentChannel.unsubscribe();
    }

    // Subscribe to new channel
    this.currentChannel = this.ably.channels.get(channelName);

    this.currentChannel.subscribe("message", (message) => {
      // Only process messages not sent by current user
      if (message.clientId !== this.currentUser.userName) {
        callback(message.data);
      }
    });

    // Add callback to set for cleanup
    this.messageCallbacks.add(callback);

    console.log(`Subscribed to channel: ${channelName}`);
    return this.currentChannel;
  }

  // Send a message through Ably
  async sendMessage(targetUserId, messageData) {
    if (!this.isRealTimeAvailable(this.currentUser?.id, targetUserId)) {
      console.log("Real-time messaging not available for this chat");
      return false;
    }

    const channelName = this.getChannelName(this.currentUser.id, targetUserId);
    const channel = this.ably.channels.get(channelName);

    try {
      await channel.publish("message", {
        ...messageData,
        senderId: this.currentUser.id,
        senderName: this.currentUser.userName,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: false, // Will be false for receiver
      });

      console.log(`Message sent via Ably to channel: ${channelName}`);
      return true;
    } catch (error) {
      console.error("Failed to send message via Ably:", error);
      return false;
    }
  }

  // Unsubscribe from current channel
  unsubscribe() {
    if (this.currentChannel) {
      this.currentChannel.unsubscribe();
      this.currentChannel = null;
    }
    this.messageCallbacks.clear();
  }

  // Close Ably connection
  close() {
    this.unsubscribe();
    this.ably.close();
  }

  // Get connection state
  getConnectionState() {
    return this.ably.connection.state;
  }
}

// Create singleton instance
const ablyService = new AblyService();
export default ablyService;

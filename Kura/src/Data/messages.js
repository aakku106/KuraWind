/** @format */

// Mock chat messages data
export const chatMessages = {
  1: [
    // Alice Johnson chat
    {
      id: 1,
      senderId: 1,
      senderName: "Alice Johnson",
      message: "Hey there! How's your day going?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      senderId: "current",
      senderName: "You",
      message: "Hi Alice! Pretty good, just working on some projects",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Alice Johnson",
      message: "That's awesome! What kind of projects?",
      timestamp: "10:33 AM",
      isOwn: false,
    },
    {
      id: 4,
      senderId: "current",
      senderName: "You",
      message: "Building a cool messenger app 😊",
      timestamp: "10:35 AM",
      isOwn: true,
    },
    {
      id: 5,
      senderId: 1,
      senderName: "Alice Johnson",
      message: "Hey! How are you doing?",
      timestamp: "10:37 AM",
      isOwn: false,
    },
    {
      id: 6,
      senderId: 1,
      senderName: "Alice Johnson",
      message: "Sounds interesting! Can't wait to see it",
      timestamp: "10:38 AM",
      isOwn: false,
    },
  ],
  2: [
    // Bob Smith chat
    {
      id: 1,
      senderId: 2,
      senderName: "Bob Smith",
      message: "Thanks for helping me yesterday!",
      timestamp: "Yesterday 3:45 PM",
      isOwn: false,
    },
    {
      id: 2,
      senderId: "current",
      senderName: "You",
      message: "No problem at all! Happy to help",
      timestamp: "Yesterday 3:47 PM",
      isOwn: true,
    },
    {
      id: 3,
      senderId: 2,
      senderName: "Bob Smith",
      message: "You're the best! 🙌",
      timestamp: "Yesterday 3:48 PM",
      isOwn: false,
    },
  ],
  3: [
    // Carol Davis chat
    {
      id: 1,
      senderId: "current",
      senderName: "You",
      message: "Hey Carol, what time works for you?",
      timestamp: "Today 2:30 PM",
      isOwn: true,
    },
    {
      id: 2,
      senderId: 3,
      senderName: "Carol Davis",
      message: "Are we still meeting at 5pm?",
      timestamp: "Today 2:45 PM",
      isOwn: false,
    },
    {
      id: 3,
      senderId: "current",
      senderName: "You",
      message: "Yes, 5pm works perfect!",
      timestamp: "Today 2:46 PM",
      isOwn: true,
    },
  ],
  4: [
    // David Wilson chat
    {
      id: 1,
      senderId: 4,
      senderName: "David Wilson",
      message: "Check out this cool video!",
      timestamp: "Yesterday",
      isOwn: false,
    },
    {
      id: 2,
      senderId: 4,
      senderName: "David Wilson",
      message: "https://example.com/video",
      timestamp: "Yesterday",
      isOwn: false,
    },
  ],
  5: [
    // Emma Brown chat
    {
      id: 1,
      senderId: "current",
      senderName: "You",
      message: "Happy birthday Emma! 🎂",
      timestamp: "2 days ago",
      isOwn: true,
    },
    {
      id: 2,
      senderId: 5,
      senderName: "Emma Brown",
      message: "Happy birthday! 🎉",
      timestamp: "2 days ago",
      isOwn: false,
    },
    {
      id: 3,
      senderId: 5,
      senderName: "Emma Brown",
      message: "Thank you so much! ❤️",
      timestamp: "2 days ago",
      isOwn: false,
    },
  ],
};

// Function to get messages for a specific chat
export const getChatMessages = (chatId) => {
  return chatMessages[chatId] || [];
};

// Function to add a new message
export const addMessage = (chatId, message) => {
  if (!chatMessages[chatId]) {
    chatMessages[chatId] = [];
  }

  const newMessage = {
    id: Date.now(),
    senderId: "current",
    senderName: "You",
    message: message,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isOwn: true,
  };

  chatMessages[chatId].push(newMessage);
  return newMessage;
};

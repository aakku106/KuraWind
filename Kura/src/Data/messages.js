/** @format */

// Mock chat messages data - will be loaded from localStorage if available
export let chatMessages = {
  1: [
    // Aarya Sharma chat
    {
      id: "msg_1_1",
      senderId: 1,
      senderName: "Aarya Sharma",
      message: "Hey there! How's your day going?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: "msg_1_2",
      senderId: "current",
      senderName: "You",
      message: "Hi Aarya! Pretty good, just working on some projects",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: "msg_1_3",
      senderId: 1,
      senderName: "Aarya Sharma",
      message: "That's awesome! What kind of projects?",
      timestamp: "10:33 AM",
      isOwn: false,
    },
    {
      id: "msg_1_4",
      senderId: "current",
      senderName: "You",
      message: "Building a cool messenger app 😊",
      timestamp: "10:35 AM",
      isOwn: true,
    },
    {
      id: "msg_1_5",
      senderId: 1,
      senderName: "Aarya Sharma",
      message: "Hey! How are you doing?",
      timestamp: "10:37 AM",
      isOwn: false,
    },
    {
      id: "msg_1_6",
      senderId: 1,
      senderName: "Aarya Sharma",
      message: "Sounds interesting! Can't wait to see it",
      timestamp: "10:38 AM",
      isOwn: false,
    },
  ],
  2: [
    // Bikram Thapa chat
    {
      id: "msg_2_1",
      senderId: 2,
      senderName: "Bikram Thapa",
      message: "Thanks for helping me yesterday!",
      timestamp: "Yesterday 3:45 PM",
      isOwn: false,
    },
    {
      id: "msg_2_2",
      senderId: "current",
      senderName: "You",
      message: "No problem at all! Happy to help",
      timestamp: "Yesterday 3:47 PM",
      isOwn: true,
    },
    {
      id: "msg_2_3",
      senderId: 2,
      senderName: "Bikram Thapa",
      message: "You're the best! 🙌",
      timestamp: "Yesterday 3:48 PM",
      isOwn: false,
    },
  ],
  3: [
    // Chandra Karki chat
    {
      id: "msg_3_1",
      senderId: "current",
      senderName: "You",
      message: "Hey Chandra, what time works for you?",
      timestamp: "Today 2:30 PM",
      isOwn: true,
    },
    {
      id: "msg_3_2",
      senderId: 3,
      senderName: "Chandra Karki",
      message: "Are we still meeting at 5pm?",
      timestamp: "Today 2:45 PM",
      isOwn: false,
    },
    {
      id: "msg_3_3",
      senderId: "current",
      senderName: "You",
      message: "Yes, 5pm works perfect!",
      timestamp: "Today 2:46 PM",
      isOwn: true,
    },
  ],
  4: [
    // Deepak Rai chat
    {
      id: "msg_4_1",
      senderId: 4,
      senderName: "Deepak Rai",
      message: "Check out this cool video!",
      timestamp: "Yesterday",
      isOwn: false,
    },
    {
      id: "msg_4_2",
      senderId: 4,
      senderName: "Deepak Rai",
      message: "https://example.com/video",
      timestamp: "Yesterday",
      isOwn: false,
    },
  ],
  5: [
    // Esha Gurung chat
    {
      id: "msg_5_1",
      senderId: "current",
      senderName: "You",
      message: "Happy birthday Esha! 🎂",
      timestamp: "2 days ago",
      isOwn: true,
    },
    {
      id: "msg_5_2",
      senderId: 5,
      senderName: "Esha Gurung",
      message: "Happy birthday! 🎉",
      timestamp: "2 days ago",
      isOwn: false,
    },
    {
      id: "msg_5_3",
      senderId: 5,
      senderName: "Esha Gurung",
      message: "Thank you so much! ❤️",
      timestamp: "2 days ago",
      isOwn: false,
    },
  ],
};

// Load chat history from localStorage
export const loadChatHistory = () => {
  try {
    const savedMessages = localStorage.getItem("kurawind_chat_history");
    if (savedMessages) {
      chatMessages = JSON.parse(savedMessages);
    }
  } catch (error) {
    console.error("Error loading chat history:", error);
  }
};

// Save chat history to localStorage
export const saveChatHistory = () => {
  try {
    localStorage.setItem("kurawind_chat_history", JSON.stringify(chatMessages));
  } catch (error) {
    console.error("Error saving chat history:", error);
  }
};

// Clear all chat history
export const clearAllChatHistory = () => {
  try {
    // Reset to default messages only
    chatMessages = {
      1: [
        {
          id: "msg_1_1",
          senderId: 1,
          senderName: "Aarya Sharma",
          message: "Hey there! How's your day going?",
          timestamp: "10:30 AM",
          isOwn: false,
        },
      ],
      2: [
        {
          id: "msg_2_1",
          senderId: 2,
          senderName: "Bikram Thapa",
          message: "Hey! Ready for a fresh start?",
          timestamp: "Now",
          isOwn: false,
        },
      ],
      3: [
        {
          id: "msg_3_1",
          senderId: 3,
          senderName: "Chandra Karki",
          message: "Hello! Let's start chatting",
          timestamp: "Now",
          isOwn: false,
        },
      ],
      4: [
        {
          id: "msg_4_1",
          senderId: 4,
          senderName: "Deepak Rai",
          message: "Hi there!",
          timestamp: "Now",
          isOwn: false,
        },
      ],
      5: [
        {
          id: "msg_5_1",
          senderId: 5,
          senderName: "Esha Gurung",
          message: "Hey! Nice to meet you",
          timestamp: "Now",
          isOwn: false,
        },
      ],
    };
    localStorage.removeItem("kurawind_chat_history");
    saveChatHistory();
    return true;
  } catch (error) {
    console.error("Error clearing chat history:", error);
    return false;
  }
};

// Clear individual chat history
export const clearChatHistory = (chatId, friendName) => {
  try {
    // Reset to one default message for this specific chat
    chatMessages[chatId] = [
      {
        id: `msg_${chatId}_1`,
        senderId: chatId,
        senderName: friendName,
        message: "Hey! Let's start a fresh conversation 😊",
        timestamp: "Now",
        isOwn: false,
      },
    ];
    saveChatHistory();
    return true;
  } catch (error) {
    console.error("Error clearing individual chat history:", error);
    return false;
  }
};

// Initialize chat history on module load
loadChatHistory();

// Function to get messages for a specific chat
export const getChatMessages = (chatId) => {
  return chatMessages[chatId] || [];
};

// Robust unique ID generator
const generateUniqueId = () => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Function to add a new message
export const addMessage = (chatId, message) => {
  if (!chatMessages[chatId]) {
    chatMessages[chatId] = [];
  }

  const newMessage = {
    id: generateUniqueId(),
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
  saveChatHistory(); // Save after adding message
  return newMessage;
};

// Initialize chat history on module load
loadChatHistory();

/** @format */

// Function to get chats based on current user
export const getChatsForUser = (currentUser) => {
  const defaultChats = [
    {
      id: 1,
      friendName: "Aarya Sharma",
      lastMessage: "Hey! How are you doing?",
      timestamp: "2m ago",
      unreadCount: 2,
      avatar: "A",
      online: true,
    },
    {
      id: 2,
      friendName: "Bikram Thapa",
      lastMessage: "Thanks for the help yesterday!",
      timestamp: "1h ago",
      unreadCount: 0,
      avatar: "B",
      online: false,
    },
    {
      id: 3,
      friendName: "Chandra Karki",
      lastMessage: "Are we still meeting at 5pm?",
      timestamp: "3h ago",
      unreadCount: 1,
      avatar: "C",
      online: true,
    },
    {
      id: 4,
      friendName: "Deepak Rai",
      lastMessage: "Check out this cool video!",
      timestamp: "1d ago",
      unreadCount: 0,
      avatar: "D",
      online: false,
    },
    {
      id: 5,
      friendName: "Esha Gurung",
      lastMessage: "Happy birthday! 🎉",
      timestamp: "2d ago",
      unreadCount: 0,
      avatar: "E",
      online: true,
    },
  ];

  // Add special real-time chat for aakku and ccn
  if (currentUser?.userName === "aakku") {
    return [
      {
        id: 2, // ccn's user id
        friendName: "CCN",
        lastMessage: "Real-time chat enabled! ⚡",
        timestamp: "now",
        unreadCount: 0,
        avatar: "C",
        online: true,
        isRealTime: true,
      },
      ...defaultChats,
    ];
  } else if (currentUser?.userName === "ccn") {
    return [
      {
        id: 1, // aakku's user id
        friendName: "Aakku",
        lastMessage: "Real-time chat enabled! ⚡",
        timestamp: "now",
        unreadCount: 0,
        avatar: "A",
        online: true,
        isRealTime: true,
      },
      ...defaultChats,
    ];
  }

  // Return default chats for other users
  return defaultChats;
};

// Legacy export for backward compatibility
export const chats = [
  {
    id: 1,
    friendName: "Aarya Sharma",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2m ago",
    unreadCount: 2,
    avatar: "A",
    online: true,
  },
  {
    id: 2,
    friendName: "Bikram Thapa",
    lastMessage: "Thanks for the help yesterday!",
    timestamp: "1h ago",
    unreadCount: 0,
    avatar: "B",
    online: false,
  },
  {
    id: 3,
    friendName: "Chandra Karki",
    lastMessage: "Are we still meeting at 5pm?",
    timestamp: "3h ago",
    unreadCount: 1,
    avatar: "C",
    online: true,
  },
  {
    id: 4,
    friendName: "Deepak Rai",
    lastMessage: "Check out this cool video!",
    timestamp: "1d ago",
    unreadCount: 0,
    avatar: "D",
    online: false,
  },
  {
    id: 5,
    friendName: "Esha Gurung",
    lastMessage: "Happy birthday! 🎉",
    timestamp: "2d ago",
    unreadCount: 0,
    avatar: "E",
    online: true,
  },
];

export const friends = [
  { id: 1, name: "Aarya Sharma", online: true, avatar: "A" },
  { id: 2, name: "Bikram Thapa", online: false, avatar: "B" },
  { id: 3, name: "Chandra Karki", online: true, avatar: "C" },
  { id: 4, name: "Deepak Rai", online: false, avatar: "D" },
  { id: 5, name: "Esha Gurung", online: true, avatar: "E" },
  { id: 6, name: "Fursang Lama", online: false, avatar: "F" },
  { id: 7, name: "Ganga Poudel", online: true, avatar: "G" },
];

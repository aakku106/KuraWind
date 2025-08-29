/** @format */

import React, { useState, useEffect } from "react";
import { ref, onValue, set, get } from "firebase/database";
import { db } from "../firebase";

function Friends({ onSelectChat, currentChatId, currentUser }) {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [addFriendQuery, setAddFriendQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load friends list
  useEffect(() => {
    if (!currentUser) return;

    const friendsRef = ref(db, `users/${currentUser.uid}/friends`);
    const unsubscribe = onValue(friendsRef, async (snapshot) => {
      const friendsData = snapshot.val() || {};
      const friendsList = [];

      for (const friendId in friendsData) {
        if (friendsData[friendId].status === 'accepted') {
          try {
            const userSnapshot = await get(ref(db, `users/${friendId}`));
            if (userSnapshot.exists()) {
              friendsList.push({
                id: friendId,
                ...userSnapshot.val(),
              });
            }
          } catch (error) {
            console.error("Error loading friend:", error);
          }
        }
      }

      setFriends(friendsList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Search for users to add as friends
  const searchUsers = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const usersSnapshot = await get(ref(db, 'users'));
      if (usersSnapshot.exists()) {
        const users = usersSnapshot.val();
        const results = [];

        for (const userId in users) {
          const user = users[userId];
          if (
            userId !== currentUser.uid &&
            (user.username.toLowerCase().includes(query.toLowerCase()) ||
             user.displayName.toLowerCase().includes(query.toLowerCase()))
          ) {
            // Check if already friends
            const isFriend = friends.some(friend => friend.id === userId);
            if (!isFriend) {
              results.push({
                id: userId,
                ...user,
              });
            }
          }
        }

        setSearchResults(results.slice(0, 10)); // Limit to 10 results
      }
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add friend
  const addFriend = async (friendId) => {
    try {
      // Add to current user's friends list
      await set(ref(db, `users/${currentUser.uid}/friends/${friendId}`), {
        status: 'accepted',
        addedAt: Date.now(),
      });

      // Add to friend's friends list
      await set(ref(db, `users/${friendId}/friends/${currentUser.uid}`), {
        status: 'accepted',
        addedAt: Date.now(),
      });

      setAddFriendQuery("");
      setSearchResults([]);
      setShowAddFriend(false);
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("Failed to add friend. Please try again.");
    }
  };

  // Create or get chat ID
  const createChatId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('_');
  };

  const handleChatSelect = (friend) => {
    const chatId = createChatId(currentUser.uid, friend.id);
    onSelectChat(chatId, friend);
  };

  const filteredFriends = friends.filter(
    friend =>
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="friends-container">
      <div className="friends-header">
        <h3>Chats</h3>
        <button
          className="add-friend-btn"
          onClick={() => setShowAddFriend(!showAddFriend)}
        >
          👥
        </button>
      </div>

      {/* Search existing friends */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Add friend section */}
      {showAddFriend && (
        <div className="add-friend-section">
          <div className="add-friend-header">
            <h4>Add Friend</h4>
            <button
              className="close-btn"
              onClick={() => {
                setShowAddFriend(false);
                setAddFriendQuery("");
                setSearchResults([]);
              }}
            >
              ✕
            </button>
          </div>
          <input
            type="text"
            placeholder="Search username..."
            value={addFriendQuery}
            onChange={(e) => {
              setAddFriendQuery(e.target.value);
              searchUsers(e.target.value);
            }}
            className="search-input"
          />
          {loading && <div className="loading">Searching...</div>}
          <div className="search-results">
            {searchResults.map((user) => (
              <div key={user.id} className="user-result">
                <div className="user-info">
                  <div className="user-name">{user.displayName}</div>
                  <div className="username">@{user.username}</div>
                </div>
                <button
                  className="add-btn"
                  onClick={() => addFriend(user.id)}
                >
                  Add
                </button>
              </div>
            ))}
            {addFriendQuery && !loading && searchResults.length === 0 && (
              <div className="no-results">No users found</div>
            )}
          </div>
        </div>
      )}

      {/* Friends list */}
      <div className="friends-list">
        {filteredFriends.length === 0 ? (
          <div className="empty-state">
            <p>No friends yet</p>
            <p>Add some friends to start chatting!</p>
          </div>
        ) : (
          filteredFriends.map((friend) => {
            const chatId = createChatId(currentUser.uid, friend.id);
            const isActive = currentChatId === chatId;
            
            return (
              <div
                key={friend.id}
                className={`friend-item ${isActive ? 'active' : ''}`}
                onClick={() => handleChatSelect(friend)}
              >
                <div className="friend-avatar">
                  {friend.displayName.charAt(0).toUpperCase()}
                </div>
                <div className="friend-info">
                  <div className="friend-name">{friend.displayName}</div>
                  <div className="friend-status">
                    {friend.status === 'online' ? '🟢 Online' : '🔴 Offline'}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Friends;

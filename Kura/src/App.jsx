/** @format */

import { useState, useEffect } from "react";
import Login from "./Components/Login";
import NewUser from "./Components/NewUser";
import Home from "./Components/Home";
import Chat from "./Components/Chat";

function App() {
  const [currentView, setCurrentView] = useState("login"); // login, signup, home, chat
  const [currentUser, setCurrentUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved authentication on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("kurawind-user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setCurrentView("home");
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("kurawind-user");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView("home");
    // Save to localStorage for persistence
    localStorage.setItem("kurawind-user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveChat(null);
    setCurrentView("login");
    // Remove from localStorage
    localStorage.removeItem("kurawind-user");
  };

  const handleOpenChat = (chat) => {
    setActiveChat(chat);
    setCurrentView("chat");
  };

  const handleBackToHome = () => {
    setActiveChat(null);
    setCurrentView("home");
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="app-container">
        <div className="app-header">
          <h1 className="app-title">KuraWind</h1>
          <p className="app-subtitle">Loading...</p>
        </div>
      </div>
    );
  }

  // Chat view
  if (currentView === "chat" && activeChat) {
    return (
      <Chat
        chatId={activeChat.id}
        friendName={activeChat.friendName}
        friendAvatar={activeChat.avatar}
        friendOnline={activeChat.online}
        onBack={handleBackToHome}
      />
    );
  }

  // Home view
  if (currentView === "home") {
    return (
      <Home
        user={currentUser}
        onLogout={handleLogout}
        onOpenChat={handleOpenChat}
      />
    );
  }

  // Login/Signup view
  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">KuraWind</h1>
        <p className="app-subtitle">
          {currentView === "login" ? "Welcome back" : "Create your account"}
        </p>
      </div>

      {currentView === "login" ? (
        <Login onLogin={handleLogin} />
      ) : (
        <NewUser onUserCreated={() => setCurrentView("login")} />
      )}

      <div className="switch-view">
        {currentView === "login" ? (
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => setCurrentView("signup")}
              className="link-button">
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setCurrentView("login")}
              className="link-button">
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

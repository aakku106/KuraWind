/** @format */

import { useState } from "react";
import Login from "./Components/Login";
import NewUser from "./Components/NewUser";

function App() {
  const [currentView, setCurrentView] = useState("login");

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">KuraWind</h1>
        <p className="app-subtitle">
          {currentView === "login" ? "Welcome back" : "Create your account"}
        </p>
      </div>

      {currentView === "login" ? <Login /> : <NewUser />}

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

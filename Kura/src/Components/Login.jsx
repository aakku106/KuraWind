/** @format */

import React, { useEffect, useState } from "react";
import { findUserByCredentials } from "../Data/Users";

function Login() {
  const [userTemp, setUserTemp] = useState({
    userNameTemp: "",
    passwordTemp: "",
  });
  const [loginStatus, setLoginStatus] = useState(null);

  useEffect(() => {
    if (userTemp.userNameTemp && userTemp.passwordTemp) {
      const foundUser = findUserByCredentials(
        userTemp.userNameTemp,
        userTemp.passwordTemp
      );

      if (foundUser) {
        setLoginStatus("success");
      } else {
        setLoginStatus("error");
      }
    } else {
      setLoginStatus(null);
    }
  }, [userTemp]);

  return (
    <div className="login-container">
      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          value={userTemp.userNameTemp}
          onChange={(e) =>
            setUserTemp({ ...userTemp, userNameTemp: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={userTemp.passwordTemp}
          onChange={(e) =>
            setUserTemp({ ...userTemp, passwordTemp: e.target.value })
          }
        />
      </div>

      {loginStatus === "success" && (
        <div className="status-message status-success">Login successful!</div>
      )}
      {loginStatus === "error" && (
        <div className="status-message status-error">
          Invalid username or password
        </div>
      )}
    </div>
  );
}

export default Login;

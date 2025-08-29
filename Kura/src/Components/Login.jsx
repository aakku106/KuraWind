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
    <>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={userTemp.userNameTemp}
          onChange={(e) =>
            setUserTemp({ ...userTemp, userNameTemp: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={userTemp.passwordTemp}
          onChange={(e) =>
            setUserTemp({ ...userTemp, passwordTemp: e.target.value })
          }
        />

        {loginStatus === "success" && (
          <p style={{ color: "green" }}>Login successful!</p>
        )}
        {loginStatus === "error" && (
          <p style={{ color: "red" }}>Invalid username or password</p>
        )}
      </div>
    </>
  );
}

export default Login;

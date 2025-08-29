/** @format */

import React, { useState } from "react";
import { validateUser } from "../validation/userSchema";
import { addUser, findUserByUsername } from "../Data/Users";

function NewUser() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the user data
    const validation = validateUser(user);

    if (!validation.success) {
      setValidationErrors(validation.errors);
      setSubmitStatus("validation-error");
      return;
    }

    // Check if username already exists
    const existingUser = findUserByUsername(user.userName);
    if (existingUser) {
      setValidationErrors({ userName: "Username already exists" });
      setSubmitStatus("username-exists");
      return;
    }

    // Create the user
    try {
      addUser(user);
      setSubmitStatus("success");
      setValidationErrors({});
      // Reset form
      setUser({ userName: "", password: "" });
    } catch {
      setSubmitStatus("error");
    }
  };

  const handleUsernameChange = (e) => {
    const userName = e.target.value;
    setUser({ ...user, userName });

    // Clear username errors when user starts typing
    if (validationErrors.userName) {
      setValidationErrors({ ...validationErrors, userName: undefined });
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setUser({ ...user, password });

    // Clear password errors when user starts typing
    if (validationErrors.password) {
      setValidationErrors({ ...validationErrors, password: undefined });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username (4+ letters only)"
            value={user.userName}
            onChange={handleUsernameChange}
            className={validationErrors.userName ? "input-error" : ""}
          />
          {validationErrors.userName && (
            <div className="error-message">{validationErrors.userName}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password (6+ chars, 1 number, 1 special char)"
            value={user.password}
            onChange={handlePasswordChange}
            className={validationErrors.password ? "input-error" : ""}
          />
          {validationErrors.password && (
            <div className="error-message">{validationErrors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Create Account
        </button>

        {submitStatus === "success" && (
          <div className="status-message status-success">
            Account created successfully!
          </div>
        )}
        {submitStatus === "validation-error" && (
          <div className="status-message status-error">
            Please fix the validation errors above
          </div>
        )}
        {submitStatus === "username-exists" && (
          <div className="status-message status-error">
            Username already taken. Please choose another.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="status-message status-error">
            Something went wrong. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}

export default NewUser;

/** @format */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../validation/userSchema";
import { addUser, findUserByUsername } from "../Data/Users";

function NewUser({ onUserCreated }) {
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  // Auto-redirect after successful user creation
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        onUserCreated();
      }, 600); // 0.6 seconds delay

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [submitStatus, onUserCreated]);

  const onSubmit = (data) => {
    // Check if username already exists
    const existingUser = findUserByUsername(data.userName);
    if (existingUser) {
      setError("userName", {
        type: "manual",
        message: "Username already exists",
      });
      setSubmitStatus("username-exists");
      return;
    }

    // Create the user
    try {
      addUser(data);
      setSubmitStatus("success");
      reset(); // Reset form after successful submission
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username (4+ letters only)"
            {...register("userName")}
            className={errors.userName ? "input-error" : ""}
          />
          {errors.userName && (
            <div className="error-message">{errors.userName.message}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password (6+ chars, 1 number, 1 special char)"
            {...register("password")}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <div className="error-message">{errors.password.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Create Account
        </button>

        {submitStatus === "success" && (
          <div className="status-message status-success">
            Account created successfully! Redirecting to login...
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

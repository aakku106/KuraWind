/** @format */

import { z } from "zod";

// Username validation: 4+ characters, no numbers, only alphabets
export const usernameSchema = z
  .string()
  .min(4, "Username must be at least 4 characters long")
  .regex(
    /^[a-zA-Z]+$/,
    "Username must contain only alphabets (no numbers or special characters)"
  );

// Password validation: 6+ characters, at least 1 special character, at least 1 number
export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/[a-zA-Z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character"
  );

// Combined user schema
export const userSchema = z.object({
  userName: usernameSchema,
  password: passwordSchema,
});

// Validation helper function
export const validateUser = (userData) => {
  try {
    userSchema.parse(userData);
    return { success: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return { success: false, errors };
  }
};

// Individual field validation helpers
export const validateUsername = (username) => {
  try {
    usernameSchema.parse(username);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.errors[0].message };
  }
};

export const validatePassword = (password) => {
  try {
    passwordSchema.parse(password);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.errors[0].message };
  }
};

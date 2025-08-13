import { STORAGE_KEYS } from "../constants/app.js";

/**
 * Get token from localStorage
 * @returns {string|null} The stored token or null if not found
 */
export const getStoredToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return null;
  }
};

/**
 * Get user data from localStorage
 * @returns {object|null} The stored user object or null if not found
 */
export const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error getting user from localStorage:", error);
    return null;
  }
};

/**
 * Store token in localStorage
 * @param {string} token - The token to store
 */
export const storeToken = (token) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  } catch (error) {
    console.error("Error storing token in localStorage:", error);
  }
};

/**
 * Store user data in localStorage
 * @param {object} user - The user object to store
 */
export const storeUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error("Error storing user in localStorage:", error);
  }
};

/**
 * Clear all auth data from localStorage
 */
export const clearAuthStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error("Error clearing auth data from localStorage:", error);
  }
};

/**
 * Check if user is authenticated based on stored data
 * @returns {boolean} True if user has valid auth data
 */
export const isAuthenticated = () => {
  const token = getStoredToken();
  const user = getStoredUser();
  return !!(token && user);
};

/**
 * Initialize auth state from localStorage
 * @returns {object} Initial auth state
 */
export const initializeAuthState = () => {
  const token = getStoredToken();
  const user = getStoredUser();
  const authenticated = !!(token && user);

  return {
    user: authenticated ? user : null,
    token: authenticated ? token : null,
    isAuthenticated: authenticated,
  };
};

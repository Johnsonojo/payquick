// Essential authentication hook for PayQuick app
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginThunk, logoutThunk, clearError } from '../../features/auth/slice/authSlice';

/**
 * Custom hook that provides authentication state and actions
 * @returns {object} Authentication state and methods
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, status, error } = useSelector((state) => state.auth);

  // Login function
  const login = useCallback(async (credentials) => {
    return dispatch(loginThunk(credentials));
  }, [dispatch]);

  // Logout function
  const logout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  // Clear any authentication errors
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Check if currently logging in
  const isLoading = status === 'loading';

  // Check if login failed
  const hasError = status === 'failed' && !!error;

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    hasError,
    error,
    status,

    // Actions
    login,
    logout,
    clearAuthError,
  };
};

/**
 * Hook for handling login form logic
 * @returns {object} Login form utilities
 */
export const useLoginForm = () => {
  const { login, isLoading, hasError, error, clearAuthError } = useAuth();

  // Handle form submission
  const handleLogin = useCallback(async (credentials) => {
    clearAuthError();
    const result = await login(credentials);
    return result;
  }, [login, clearAuthError]);

  return {
    handleLogin,
    isLoading,
    hasError,
    error,
    clearAuthError,
  };
};

/**
 * Hook for protected route logic
 * @returns {object} Protected route utilities
 */
export const useProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Check if route should be accessible
  const isRouteAccessible = useCallback(() => {
    return isAuthenticated;
  }, [isAuthenticated]);

  return {
    isAuthenticated,
    isRouteAccessible,
  };
};

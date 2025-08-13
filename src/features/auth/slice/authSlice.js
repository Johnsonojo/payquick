import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  clearAuthStorage,
  initializeAuthState,
  storeToken,
  storeUser,
} from "../../../shared/utils/auth.js";
import { login, logout as logoutApi } from "../api/authApi.js";

// Async thunks
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      // Store token and user data
      storeToken(response.token);
      storeUser(response.user);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      // Clear localStorage
      clearAuthStorage();
      return;
    } catch (error) {
      // Even if API call fails, clear local storage
      clearAuthStorage();
      return rejectWithValue(error.message);
    }
  }
);

// Initial state - check localStorage for existing auth data
const getInitialState = () => {
  const authData = initializeAuthState();

  return {
    ...authData,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Manual logout without API call
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      clearAuthStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Logout cases
      .addCase(logoutThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        // Even if logout fails, clear the auth state
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;

export default authSlice.reducer;

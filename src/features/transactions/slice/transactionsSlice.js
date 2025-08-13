import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "../api/transactionsApi.js";

// Async thunks
export const fetchTransactionsThunk = createAsyncThunk(
  "transactions/fetchTransactions",
  async (userId, { rejectWithValue }) => {
    try {
      const transactions = await getTransactions(userId);
      return transactions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  transactions: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state.transactions = [];
      state.status = "idle";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions cases
      .addCase(fetchTransactionsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactionsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch transactions";
      });
  },
});

export const { clearTransactions, clearError } = transactionsSlice.actions;

export default transactionsSlice.reducer;

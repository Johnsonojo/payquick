// Essential transactions hook for PayQuick app
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearTransactions,
  fetchTransactionsThunk,
} from "../../features/transactions/slice/transactionsSlice.js";

/**
 * Custom hook that provides transaction state and actions
 * @returns {object} Transaction state and methods
 */
export const useTransactions = () => {
  const dispatch = useDispatch();
  const { transactions, status, error } = useSelector(
    (state) => state.transactions
  );
  const { user } = useSelector((state) => state.auth);

  // Fetch transactions for current user
  const fetchTransactions = useCallback(
    (userId = user?.id) => {
      if (userId) {
        return dispatch(fetchTransactionsThunk(userId));
      }
    },
    [dispatch, user?.id]
  );

  // Clear transactions
  const clearAllTransactions = useCallback(() => {
    dispatch(clearTransactions());
  }, [dispatch]);

  // Clear transaction errors
  const clearTransactionError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Refresh transactions (fetch again)
  const refreshTransactions = useCallback(() => {
    if (user?.id) {
      fetchTransactions(user.id);
    }
  }, [fetchTransactions, user?.id]);

  // Check if currently loading
  const isLoading = status === "loading";

  // Check if there's an error
  const hasError = status === "failed" && !!error;

  // Check if data is loaded successfully
  const isLoaded = status === "succeeded";

  return {
    // State
    transactions,
    status,
    error,
    isLoading,
    hasError,
    isLoaded,

    // Actions
    fetchTransactions,
    clearAllTransactions,
    clearTransactionError,
    refreshTransactions,
  };
};

import baseAxios from "../../../shared/api/baseAxios";
import { API_ENDPOINTS } from "../../../shared/constants/api";

const getTransactions = async (userId) => {
  // Fetch all transactions and filter by user ID
  const response = await baseAxios.get(API_ENDPOINTS.TRANSACTIONS);
  const allTransactions = response.data;

  // Ensure userId is compared as the same type (convert to number for comparison)
  const userIdNumber = parseInt(userId, 10);

  // Filter transactions for the specific user with type conversion
  const userTransactions = allTransactions.filter((transaction) => {
    return transaction.userid === userIdNumber || transaction.userid === userId;
  });

  // Sort by date (newest first)
  const sortedTransactions = userTransactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return sortedTransactions;
};

export { getTransactions };

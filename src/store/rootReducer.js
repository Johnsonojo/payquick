import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice/authSlice";
import transactionsReducer from "../features/transactions/slice/transactionsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
});

export default rootReducer;

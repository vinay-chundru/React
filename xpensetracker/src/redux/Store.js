import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import expenseReducer from "./expenseSlice";
import transactionReducer from "./transactionSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
    transactions: transactionReducer,
  },
});

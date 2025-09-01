import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactionList: [],
  },
  reducers: {
    addTransactionEntry: (state, action) => {
      const transaction = action.payload;
      state.transactionList.push(transaction);
    },
    removeTransactionEntry: (state, action) => {
      state.transactionList = state.transactionList.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
    removeAllTransactions: (state) => {
      state.transactionList = [];
    },
  },
});

export const { addTransactionEntry, removeTransactionEntry, removeAllTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;

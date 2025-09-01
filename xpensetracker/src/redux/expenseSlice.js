import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalExpense: 0,
  categoricalExpense: {
    food: 0,
    travel: 0,
    entertainment: 0,
    others: 0,
  },
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    updateTotalExpense: (state, action) => {
      const { amount, operation } = action.payload;
      state.totalExpense = operation === "add" ? state.totalExpense + amount : state.totalExpense - amount;
    },
    updateCategoricalExpense: (state, action) => {
      const { amount, category, operation } = action.payload;
      state.categoricalExpense[category] =
        operation === "add" ? state.categoricalExpense[category] + amount : state.categoricalExpense[category] - amount;
    },
    resetAllExpense: () => initialState,
  },
});


export const { updateTotalExpense, updateCategoricalExpense, resetAllExpense } = expenseSlice.actions;
export default expenseSlice.reducer;

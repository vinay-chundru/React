import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  monthlyBudget: "",
  categoricalBudget: {
    food: "",
    travel: "",
    entertainment: "",
    others: "",
  },
  activeFilter: "all",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    updateMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
    updateCategoricalBudget: (state, action) => {
      state.categoricalBudget = { ...state.categoricalBudget, ...action.payload };
    },
    updateActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    
    //  Update Everything at Once
    updateBudget: (state, action) => {
      const { userName, monthlyBudget, categoricalBudget } = action.payload;
      state.userName = userName;
      state.monthlyBudget = monthlyBudget;
      state.categoricalBudget = categoricalBudget;
    },

    //  Reset Budget but Keep User Name
    resetAllBudget: (state) => {
      state.userName="";
      state.monthlyBudget = "";
      state.categoricalBudget = {
        food: "",
        travel: "",
        entertainment: "",
      };
      state.activeFilter = "all";
    },
  },
});

export const { 
  updateUserName, 
  updateMonthlyBudget, 
  updateCategoricalBudget, 
  updateActiveFilter, 
  updateBudget, 
  resetAllBudget,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../shared/constants';

const initialState = {
  transactions: JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPENSES) || '[]'),
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      localStorage.setItem(
        STORAGE_KEYS.EXPENSES,
        JSON.stringify(state.transactions)
      );
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
        localStorage.setItem(
          STORAGE_KEYS.EXPENSES,
          JSON.stringify(state.transactions)
        );
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(state.transactions));
    },
    clearTransactions: (state) => {
      state.transactions = [];
      localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    },
  },
});

export default expensesSlice.reducer;
export const { addTransaction, deleteTransaction, clearTransactions } = expensesSlice.actions;

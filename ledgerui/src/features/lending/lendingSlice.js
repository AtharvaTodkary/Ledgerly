import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../shared/constants';

const initialState = {
  loans: JSON.parse(localStorage.getItem(STORAGE_KEYS.LOANS) || '[]'),
};

export const lendingSlice = createSlice({
  name: 'lending',
  initialState,
  reducers: {
    addLoan: (state, action) => {
      const newLoan = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.loans.push(newLoan);
      localStorage.setItem(
        STORAGE_KEYS.LOANS,
        JSON.stringify(state.loans)
      );
    },
    updateLoan: (state, action) => {
      const index = state.loans.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.loans[index] = action.payload;
        localStorage.setItem(
          STORAGE_KEYS.LOANS,
          JSON.stringify(state.loans)
        );
      }
    },
    deleteLoan: (state, action) => {
      state.loans = state.loans.filter((l) => l.id !== action.payload);
      localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(state.loans));
    },
    // Record partial payment
    recordPayment: (state, action) => {
      const loan = state.loans.find((l) => l.id === action.payload.loanId);
      if (loan) {
        loan.partialPayments.push(action.payload.payment);
        const newBalance = loan.totalAmount - loan.partialPayments.reduce((sum, p) => sum + p.amount, 0);
        loan.remainingBalance = Math.max(0, newBalance);
        loan.status =
          newBalance === 0 ? 'paid' : loan.partialPayments.length >= 1 ? 'partial' : 'unpaid';
        localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(state.loans));
      }
    },
    markLoanPaid: (state, action) => {
      const loan = state.loans.find((l) => l.id === action.payload);
      if (loan) {
        loan.status = 'paid';
        loan.remainingBalance = 0;
        localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(state.loans));
      }
    },
    clearLoans: (state) => {
      state.loans = [];
      localStorage.removeItem(STORAGE_KEYS.LOANS);
    },
  },
});

export default lendingSlice.reducer;
export const { addLoan, deleteLoan, recordPayment, markLoanPaid, clearLoans } = lendingSlice.actions;

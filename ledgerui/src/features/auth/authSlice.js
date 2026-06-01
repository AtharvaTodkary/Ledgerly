import { createSlice } from '@reduxjs/toolkit';
import { AUTH_STATUS } from './authTypes';

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Login failed.';
    },
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Registration failed.';
    },
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: () => initialState,
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Logout failed.';
    },
    refreshTokenRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    refreshTokenSuccess: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    refreshTokenFailure: (state, action) => {
      state.loading = false;
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload || 'Session restore failed.';
    },
    restoreSessionRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    restoreSessionSuccess: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    restoreSessionFailure: (state, action) => {
      state.loading = false;
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload || 'Unable to restore session.';
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure,
  restoreSessionRequest,
  restoreSessionSuccess,
  restoreSessionFailure,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;

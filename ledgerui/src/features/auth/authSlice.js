import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../shared/constants';

const clearAuthStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_ID);
  localStorage.removeItem(STORAGE_KEYS.USER_MAIL);
};

const persistAuthStorage = ({ accessToken, refreshToken, user }) => {
  if (accessToken) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken);
  }

  if (typeof refreshToken === 'string' && refreshToken.length > 0) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  if (refreshToken === null) {
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  if (user?._id) {
    localStorage.setItem(STORAGE_KEYS.USER_ID, user._id);
  }

  if (user?.email) {
    localStorage.setItem(STORAGE_KEYS.USER_MAIL, user.email);
  }
};

const getInitialState = () => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

  return {
    user: null,
    accessToken,
    isAuthenticated: Boolean(accessToken),
    loading: false,
    error: null,
  };
};

const initialState = getInitialState();

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
      persistAuthStorage(action.payload);
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
    logoutSuccess: () => {
      clearAuthStorage();
      return getInitialState();
    },
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
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      state.isAuthenticated = true;
      state.error = null;
      persistAuthStorage(action.payload);
    },
    refreshTokenFailure: (state, action) => {
      state.loading = false;
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload || 'Session restore failed.';
      clearAuthStorage();
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
      persistAuthStorage(action.payload);
    },
    restoreSessionFailure: (state, action) => {
      state.loading = false;
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload || 'Unable to restore session.';
      clearAuthStorage();
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

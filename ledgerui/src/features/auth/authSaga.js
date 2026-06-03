import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { notification } from 'antd';
import { STORAGE_KEYS } from '../../shared/constants';
import {
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
} from './authSlice';
import { authApi } from './authApi';

const extractAuthData = (responseData) => responseData?.data || responseData;

function* handleLogin({ payload }) {
  try {
    const response = yield call(authApi.login, payload);
    const { accessToken, user, refreshToken } = extractAuthData(response.data);

    yield put(loginSuccess({ accessToken, user, refreshToken }));
    // window.location.href = '/dashboard';
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
    notification.error({ message: 'Login Failed', description: message });
    yield put(loginFailure(message));
  }
}

function* handleRegister({ payload }) {
  try {
    const response = yield call(authApi.register, payload);
    const { accessToken, user, refreshToken } = extractAuthData(response.data);

    if (accessToken && user) {
      yield put(registerSuccess());
      yield put(loginSuccess({ accessToken, user, refreshToken }));
      window.location.href = '/dashboard';
      return;
    }

    yield put(registerSuccess());
    notification.success({ message: 'Registration Successful', description: 'Please sign in to continue.' });
    window.location.href = '/login';
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed. Please try again.';
    notification.error({ message: 'Registration Failed', description: message });
    yield put(registerFailure(message));
  }
}

function* handleLogout() {
  try {
    yield call(authApi.logout);
    yield put(logoutSuccess());
    window.location.href = '/login';
  } catch (error) {
    const message = error.response?.data?.message || 'Logout failed. Please try again.';
    notification.warning({ message: 'Logout Warning', description: `${message} Clearing local session.` });
    yield put(logoutFailure(message));
    yield put(logoutSuccess());
    window.location.href = '/login';
  }
}

function* handleRefreshToken() {
  try {
    const fallbackRefreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) || undefined;
    const response = yield call(authApi.refreshToken, fallbackRefreshToken);
    const { accessToken, user, refreshToken } = extractAuthData(response.data);
    yield put(refreshTokenSuccess({ accessToken, user, refreshToken }));
  } catch (error) {
    const message = error.response?.data?.message || 'Session restore failed.';
    yield put(refreshTokenFailure(message));
  }
}

function* handleRestoreSession() {
  try {
    const fallbackRefreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) || undefined;
    const response = yield call(authApi.refreshToken, fallbackRefreshToken);
    const { accessToken, user, refreshToken } = extractAuthData(response.data);
    yield put(restoreSessionSuccess({ accessToken, user, refreshToken }));
  } catch (error) {
    const message = error.response?.data?.message || 'Unable to restore session.';
    yield put(restoreSessionFailure(message));
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, handleLogin);
}

function* watchRegister() {
  yield takeLatest(registerRequest.type, handleRegister);
}

function* watchLogout() {
  yield takeLatest(logoutRequest.type, handleLogout);
}

function* watchRefreshToken() {
  yield takeLatest(refreshTokenRequest.type, handleRefreshToken);
}

function* watchRestoreSession() {
  yield takeLatest(restoreSessionRequest.type, handleRestoreSession);
}

export default function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchLogout),
    fork(watchRefreshToken),
    fork(watchRestoreSession),
  ]);
}

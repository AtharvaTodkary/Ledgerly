import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { notification } from 'antd';
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

function* handleLogin({ payload }) {
  try {
    const response = yield call(authApi.login, payload);
    const { accessToken, user } = response.data;

    yield put(loginSuccess({ accessToken, user }));
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
    const { accessToken, user } = response.data;

    if (accessToken && user) {
      yield put(registerSuccess());
      yield put(loginSuccess({ accessToken, user }));
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
    notification.error({ message: 'Logout Failed', description: message });
    yield put(logoutFailure(message));
  }
}

function* handleRefreshToken() {
  try {
    const response = yield call(authApi.refreshToken);
    const { accessToken } = response.data;
    yield put(refreshTokenSuccess({ accessToken }));
  } catch (error) {
    yield put(refreshTokenFailure());
  }
}

function* handleRestoreSession() {
  try {
    const response = yield call(authApi.refreshToken);
    const { accessToken, user } = response.data;
    yield put(restoreSessionSuccess({ accessToken, user }));
  } catch (error) {
    yield put(restoreSessionFailure());
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

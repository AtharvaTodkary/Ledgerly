import axios from 'axios';
import store from '../app/store/store';
import { refreshTokenSuccess, refreshTokenFailure, logoutSuccess } from '../features/auth/authSlice';
import endpoints from './endpoints';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let pendingRequests = [];

const processPendingRequests = (error, token = null) => {
  pendingRequests.forEach((callback) => callback(error, token));
  pendingRequests = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || originalRequest._retry || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes(endpoints.auth.refresh)) {
      store.dispatch(refreshTokenFailure());
      store.dispatch(logoutSuccess());
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push((refreshError, accessToken) => {
          if (refreshError) {
            reject(refreshError);
            return;
          }

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshResponse = await axiosInstance.post(endpoints.auth.refresh, null, {
        withCredentials: true,
      });
      const { accessToken } = refreshResponse.data;

      store.dispatch(refreshTokenSuccess({ accessToken }));
      processPendingRequests(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processPendingRequests(refreshError, null);
      store.dispatch(refreshTokenFailure());
      store.dispatch(logoutSuccess());
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;

import apiClient from '../../services/apiClient';
import endpoints from '../../services/endpoints';

export const authApi = {
  login: (credentials) => apiClient.post(endpoints.auth.login, credentials),
  register: (data) => apiClient.post(endpoints.auth.register, data),
  logout: () => apiClient.post(endpoints.auth.logout, null),
  refreshToken: (refreshToken) =>
    apiClient.post(
      endpoints.auth.refresh,
      refreshToken ? { refreshToken } : null,
    ),
};

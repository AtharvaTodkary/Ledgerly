import axiosInstance from "./axiosInstance";

const apiClient = {
  get: async (url, config) => {
    return await axiosInstance.get(url, config);
  },
  post: async (url, data, config) => {
    return await axiosInstance.post(url, data, config);
  },
  put: async (url, data, config) => {
    return await axiosInstance.put(url, data, config);
  },
  patch: async (url, data, config) => {
    return await axiosInstance.patch(url, data, config);
  },
  delete: async (url, config) => {
    return await axiosInstance.delete(url, config);
  },
};

export default apiClient;
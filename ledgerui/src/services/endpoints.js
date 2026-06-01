// API Endpoints configuration
export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  
  // Users
  users: {
    list: '/users',
    get: (id) => `/users/${id}`,
    create: '/users',
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
    profile: '/users/profile',
  },
  
  // Dashboard
  dashboard: {
    stats: '/dashboard/stats',
    data: '/dashboard/data',
  },
};

export default endpoints;

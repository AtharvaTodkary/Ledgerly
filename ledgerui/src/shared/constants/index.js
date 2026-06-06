// Application constants

export const APP_NAME = 'Ledgerly';

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ID: 'userid',
  USER_MAIL: 'email',
  THEME: 'theme',
  EXPENSES: 'ledgerly_expenses',
  LOANS: 'ledgerly_loans',
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register',
  NOT_FOUND: '*',
  EXPENSES: '/expenses',
  ADD_EXPENSE: '/expenses/new',
  LENDING: '/lending',
  ADD_LOAN: '/lending/new',
  LOAN_PAYMENTS: '/lending/payments',
};

// Transaction categories
export const TRANSACTION_CATEGORIES = {
  INCOME: ['Salary', 'Bonus', 'Investments', 'Gifts', 'Other'],
  EXPENSE: ['Food', 'Transport', 'Utilities', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Other'],
};

// Loan statuses
export const LOAN_STATUSES = {
  UNPAID: 'unpaid',
  PAID: 'paid',
  PARTIAL: 'partial',
};

export const LOAN_STATUS_LABELS = {
  unpaid: 'Unpaid',
  paid: 'Paid',
  partial: 'Partial',
};

export const LOAN_STATUS_COLORS = {
  unpaid: '#ff4d4f',
  paid: '#52c41a',
  partial: '#faad14',
};

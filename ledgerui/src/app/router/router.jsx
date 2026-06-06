import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register';
import ProtectedRoute from '../../shared/components/ProtectedRoute';
import Expenses from '../../pages/expenses/Expenses';
import AddTransaction from '../../pages/expenses/AddTransaction';
import Lending from '../../pages/lending/Lending';
import AddLoan from '../../pages/lending/AddLoan';
import LoanPayments from '../../pages/lending/LoanPayments';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        lazy: async () => {
          const { default: Dashboard } = await import('../../pages/Dashboard');
          return {
            Component: () => <ProtectedRoute element={<Dashboard />} />,
          };
        },
      },
      {
        path: 'profile',
        lazy: async () => {
          const { default: Profile } = await import('../../pages/Profile');
          return {
            Component: () => <ProtectedRoute element={<Profile />} />,
          };
        },
      },
      {
        path: 'settings',
        lazy: async () => {
          const { default: Settings } = await import('../../pages/Settings');
          return {
            Component: () => <ProtectedRoute element={<Settings />} />,
          };
        },
      },
      // Expense pages
      {
        path: 'expenses',
        element: <Expenses />,
      },
      {
        path: 'expenses/new',
        lazy: async () => {
          const { default: AddTransaction } = await import('../../pages/expenses/AddTransaction');
          return {
            Component: AddTransaction,
          };
        },
      },
      // Lending pages
      {
        path: 'lending',
        element: <Lending />,
      },
      {
        path: 'lending/new',
        lazy: async () => {
          const { default: AddLoan } = await import('../../pages/lending/AddLoan');
          return {
            Component: AddLoan,
          };
        },
      },
      {
        path: 'lending/payments',
        lazy: async () => {
          const { default: LoanPayments } = await import('../../pages/lending/LoanPayments');
          return {
            Component: LoanPayments,
          };
        },
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import ProtectedRoute from '../../shared/components/ProtectedRoute';

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
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

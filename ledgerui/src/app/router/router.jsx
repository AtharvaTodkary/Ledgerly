import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../../layout/AppLayout';
import { RoutesItems } from '../../configs/RouteConfigs';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: RoutesItems,
  },
]);

export default router;

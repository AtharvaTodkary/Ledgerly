import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import store from '../store/store';
import router from '../router/router';
import { restoreSessionRequest } from '../../features/auth/authSlice';

function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSessionRequest());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default function AppProviders() {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <AppInitializer />
      </ConfigProvider>
    </Provider>
  );
}

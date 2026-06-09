import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from './Header';
import AppFooter from './Footer';

const { Content } = Layout;

export default function AppLayout() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppHeader />

      <Content
        style={{
          flex: 1,
          paddingTop: '18px', // Header height
          paddingInline: '24px',
        }}
      >
        <Outlet />
      </Content>

      <AppFooter />
    </Layout>
  );
}
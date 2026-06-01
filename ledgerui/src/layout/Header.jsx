import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

export default function AppHeader() {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/',
      label: 'Home',
      onClick: () => navigate('/'),
    },
    {
      key: '/dashboard',
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/profile',
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: '/settings',
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
  ];

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        paddingInline: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: '20px',
            fontWeight: 600,
            marginRight: '32px',
          }}
        >
          Ledgerly
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </div>
    </Header>
  );
}
import { Layout } from 'antd';

const { Footer } = Layout;

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Footer
      style={{
        textAlign: 'center',
        padding: '16px 24px',
        marginTop: 'auto',
      }}
    >
      © {currentYear} Ledgerly. All rights reserved.
    </Footer>
  );
}
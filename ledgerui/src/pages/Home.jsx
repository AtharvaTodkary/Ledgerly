import { Button, Row, Col, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Title level={2}>Welcome to Ledgerly</Title>
            <Paragraph>
              A modern ledger and accounting management system. Navigate to get started.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable onClick={() => navigate('/dashboard')}>
            <Title level={4}>Dashboard</Title>
            <Paragraph>View your financial overview and analytics.</Paragraph>
            <Button type="primary" block>
              Go to Dashboard
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable onClick={() => navigate('/profile')}>
            <Title level={4}>Profile</Title>
            <Paragraph>Manage your account and personal information.</Paragraph>
            <Button type="primary" block>
              Go to Profile
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable onClick={() => navigate('/settings')}>
            <Title level={4}>Settings</Title>
            <Paragraph>Configure application preferences and security.</Paragraph>
            <Button type="primary" block>
              Go to Settings
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

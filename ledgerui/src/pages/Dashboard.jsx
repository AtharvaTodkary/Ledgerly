import { Card, Row, Col, Typography } from 'antd';

const { Title } = Typography;

export default function Dashboard() {
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Title level={2}>Dashboard</Title>
            <p>Dashboard statistics and analytics will be displayed here.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

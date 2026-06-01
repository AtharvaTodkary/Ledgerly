import { Card, Row, Col, Typography, Form, Input, Button } from 'antd';

const { Title } = Typography;

export default function Profile() {
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card>
            <Title level={2}>User Profile</Title>
            <Form layout="vertical">
              <Form.Item label="Name">
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item label="Email">
                <Input type="email" placeholder="Enter your email" />
              </Form.Item>
              <Button type="primary">Save Changes</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

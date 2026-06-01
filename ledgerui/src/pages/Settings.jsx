import { Card, Row, Col, Typography, Form, Switch, Select, Button } from 'antd';

const { Title } = Typography;

export default function Settings() {
  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card>
            <Title level={2}>Settings</Title>
            <Form layout="vertical">
              <Form.Item label="Theme">
                <Select defaultValue="light" options={[
                  { label: 'Light', value: 'light' },
                  { label: 'Dark', value: 'dark' },
                ]} />
              </Form.Item>
              <Form.Item label="Notifications">
                <Switch defaultChecked />
              </Form.Item>
              <Button type="primary">Save Settings</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

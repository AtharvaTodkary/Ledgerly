import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, Alert } from 'antd';
import { loginRequest, clearAuthError } from '../features/auth/authSlice';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../features/auth/authSelectors';

const { Title, Text } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (error) {
      const timeoutId = window.setTimeout(() => {
        dispatch(clearAuthError());
      }, 5000);
      return () => window.clearTimeout(timeoutId);
    }
    return undefined;
  }, [error, dispatch]);

  if (isAuthenticated) {
    window.location.href = '/dashboard';
  }

  const onFinish = (values) => {
    dispatch(loginRequest(values));
  };

  return (
    <Card className="auth-card">
      <Title level={2}>Sign In</Title>
      {error && <Alert type="error" message={error} style={{ marginBottom: 20 }} />}
      <Form name="login" layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Enter a valid email' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}> 
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <Text>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </Text>
    </Card>
  );
}

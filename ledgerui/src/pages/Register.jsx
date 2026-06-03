import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, Typography, Alert } from 'antd';
import { registerRequest, clearAuthError } from '../features/auth/authSlice';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../features/auth/authSelectors';

const { Title, Text } = Typography;

export default function Register() {
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

  // if (isAuthenticated) {
  //   window.location.href = '/dashboard';
  // }

  const onFinish = (values) => {
    dispatch(registerRequest(values));
  };

  return (
    <Card className="auth-card">
      <Title level={2}>Create Account</Title>
      {error && <Alert type="error" message={error} style={{ marginBottom: 20 }} />}
      <Form
        name="register"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}> 
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Enter a valid email' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter a password' }]}> 
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
      <Text>
        Already have an account? <Link to="/login">Sign in</Link>
      </Text>
    </Card>
  );
}

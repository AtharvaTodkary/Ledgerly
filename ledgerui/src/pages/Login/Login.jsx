import {
  Layout,
  Card,
  Button,
  Alert,
  Typography,
  Divider,
  Space,
} from "antd";
import { Form, Formik } from "formik";
import { Link, Navigate } from "react-router-dom";
import GenericInput from "../../shared/components/core-components/GenericInput";
import { loginSchema } from "./form";
import { loginRequest } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthError, selectAuthLoading, selectIsAuthenticated } from "../../features/auth/authSelectors";

const { Title, Text } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout
      style={{
        maxHeight: "70vh",
        background: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // padding: "24px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <Title
            level={2}
            style={{
              marginBottom: "8px",
            }}
          >
            Ledgerly
          </Title>

          <Text type="secondary">Sign in to access your workspace</Text>
        </div>

        {error ? <Alert type="error" message={error} style={{ marginBottom: 16 }} /> : null}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            dispatch(loginRequest(values));
          }}
        >
          {() => (
            <Form>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <GenericInput
                  name="email"
                  label="Email"
                  placeholder="john@company.com"
                  required
                />

                <GenericInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  required
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Link to="/login">Forgot Password?</Link>
                </div>

                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  loading={loading}
                  block
                >
                  Sign In
                </Button>
              </Space>
            </Form>
          )}
        </Formik>

        <Divider />

        <div
          style={{
            textAlign: "center",
          }}
        >
          <Text type="secondary">Don't have an account? </Text>

          <Link to="/register">Create account</Link>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          <Text type="secondary">Need access? Contact your administrator.</Text>
        </div>
      </Card>
    </Layout>
  );
}

import { VFC } from "react";
import { Layout, Typography, Card, Space, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const { Content } = Layout;

export type SignUpFormValues = {
  email: string;
  password: string;
}

type SignUpFormType = {
  onSignUp: (values: SignUpFormValues) => void;
}

export const SignUpForm: VFC<SignUpFormType> = ({ onSignUp }) => (
  <Layout>
    <Content>
      <Card>
        <Space direction="vertical" align="center" style={{ width: "100%", marginBottom: "16px" }}>
          <Title level={3}>Sign Up</Title>
          <Text type="secondary">to continue to Washoe</Text>
        </Space>
        <Form onFinish={onSignUp}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <Text>Already have an account? <Link to="/login">Log In</Link></Text>
        </Space>
      </Card>
    </Content>
  </Layout>
);

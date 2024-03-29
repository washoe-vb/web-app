import { VFC } from "react";
import { Form, Input, Button, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export type LoginFormValues = {
  email: string;
  password: string;
}

type LoginFormType = {
  onLogIn: (values: LoginFormValues) => void;
}

export const LoginForm: VFC<LoginFormType> = ({ onLogIn }) => (
  <>
    <Space direction="vertical" align="center" style={{ width: "100%", marginBottom: "16px" }}>
      <Title level={3}>Log In</Title>
      <Text type="secondary">to continue to Washoe</Text>
    </Space>
    <Form onFinish={onLogIn}>
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
        rules={[ { required: true, message: "Please input your Password!" } ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log In
        </Button>
      </Form.Item>
    </Form>
    <Space direction="vertical" align="center" style={{ width: "100%" }}>
      <Text>New to Washoe? <Link to="/signup">Create an account</Link></Text>
    </Space>
  </>
);

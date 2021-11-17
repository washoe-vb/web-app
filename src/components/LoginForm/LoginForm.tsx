import { VFC } from "react";
import { Layout, Form, Input, Button, Typography, Card, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;
const { Content } = Layout;

export type LoginFormValues = {
  login: string;
  password: string;
}

type LoginFormType = {
  onLogIn: (values: LoginFormValues) => void;
}

export const LoginForm: VFC<LoginFormType> = ({ onLogIn }) => (
  <Layout>
    <Content>
      <Card>
        <Space direction="vertical" align="center" style={{ width: "100%", marginBottom: "16px" }}>
          <Title level={3}>Log In</Title>
          <Text>to continue to Washoe</Text>
        </Space>
        <Form name="normal_login" onFinish={onLogIn}>
          <Form.Item
            name="login"
            rules={[ { required: true, message: "Please input your login!" } ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Login" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[ { required: true, message: "Please input your Password!" } ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Log in
            </Button>
          </Form.Item>
        </Form>
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <Text>New to Washoe? <Link href="sign-up">Create an account!</Link></Text>
        </Space>
      </Card>
    </Content>
  </Layout>
);

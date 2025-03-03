"use client"
import { Form, Input, Button, Checkbox, Card, Spin } from 'antd';
import { useLogin } from '@refinedev/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { getLogoutLoadingContext } from '@context/logoutSpinner';


const LoginComponent = () => {
  const { setLoading: setlogoutLoading } = getLogoutLoadingContext();
  setlogoutLoading(false)
  const { mutate: login } = useLogin();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true); // Set loading to true when the form is submitted
    login(values, {
      onSuccess: () => {
        router.push('/');
      },
      onError: () => {
        setLoading(false); // Reset loading state on error
      },
      onSettled: () => {
        setLoading(false); // Reset loading state when the operation is complete
      },
    });
  };

  return (
    <Card title="Sign in to your account" style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          initialValue="email@gmail.com"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          initialValue="admin"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>


          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            Sign in
            {
              loading &&
              <Spin indicator={<LoadingOutlined style={{ color: "white" }} />}
              />

            }
          </Button>

        </Form.Item>

        <Form.Item>
          <Button type="link" onClick={() => router.push('/forgot-password')}>
            Forgot password?
          </Button>
          <Button type="link" onClick={() => router.push('/signup')} style={{ float: 'right' }}>
            Don&apos;t have an account? Sign up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginComponent;
//verityEmail
"use client";
import React from "react";
import { Form, Input, Button, Typography, Layout, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import {router} from "next/client";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const layoutStyles: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#F2F9FF'
};
const headerStyles: React.CSSProperties = {
    backgroundColor: '#F2F9FF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px 0 0px'
}
const logoStyles: React.CSSProperties = {
    marginTop:'20px',
    cursor: 'pointer',

};
export default function EmailVerification() {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = (values: any) => {
    const code = Object.values(values).join("");
    console.log("Verification code:", code);
  };

  return (
      <Layout style={layoutStyles}>
          <Header style={headerStyles}>
              <Image src="/logo.png"
                     alt="Logo"
                     width={540}
                     height={114}
                     style={logoStyles}
                     priority  />
              <Space>
                  <Button type="default" style={{ backgroundColor: '#5C7893', color: 'white', border: '100' }}
                          onClick={() => router.push('/authenticate/login')}
                  >Log In</Button>
                  <Button type="default" style={{ backgroundColor: '#90A6BF', color: 'black', border: '100' }}
                          onClick={() => router.push('/authenticate/signUp')}
                  >Sign Up</Button>
              </Space>
          </Header>

      {/* Main content */}
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
              backgroundColor: '#F2F9FF',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            padding: "40px",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "420px",
              marginBottom: '70px',
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <MailOutlined style={{ fontSize: "48px", color: "#1B4372" }} />
            <Title level={4} style={{ marginTop: "16px", color: "#1B4372" }}>
              Verify your email
            </Title>
            <Text style={{ color: "#586577" }}>
              Enter the 6-digit verification code we sent to your inbox below:
            </Text>
          </div>

          <Form form={form} onFinish={onFinish} layout="horizontal">
            {/*6 code entry boxes*/}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <Form.Item
                  key={i}
                  name={`digit${i}`}
                  rules={[{ required: true, message: "" }]}
                  style={{ flex: 1 }}
                >
                  <Input
                    maxLength={1}
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      padding: "8px",
                    }}
                  />
                </Form.Item>
              ))}
            </div>

            {/* Verify  Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  backgroundColor: "#839EBC",
                  borderColor: "#839EBC",
                  borderRadius: "50px",
                  padding: "20px",
                }}
              >
                Verify
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  backgroundColor: "#1B4372",
                  borderColor: "#1B4372",
                  borderRadius: "50px",
                  padding: "20px",
                }}
              >
                Resend Email
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}

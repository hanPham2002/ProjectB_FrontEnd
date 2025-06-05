//verityEmail
"use client";
import React from "react";
import { Form, Input, Button, Typography, Layout, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { router } from "next/client";
import axios from "axios";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const layoutStyles: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#F2F9FF",
};
const headerStyles: React.CSSProperties = {
  backgroundColor: "#F2F9FF",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 40px 0 0px",
};
const logoStyles: React.CSSProperties = {
  marginTop: "20px",
  cursor: "pointer",
};
export default function EmailVerification() {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values: any) => {
    const code = Object.values(values).join("");
    console.log("Verification code:", code);
    try {
      const res = await axios.post(
        "https://localhost:7089/api/Users/VerifyEmail",
        {
          activeCode: code,
        }
      );
      if (res.status === 200) {
        router.push("/authenticate/signup/verify/password");
      } else {
        alert("Errrow with verrify email");
      }
    } catch (error: any) {
      alert(`Errro : ${error.message}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F2F9FF",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        padding: "40px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "420px",
        marginBottom: "70px",
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
  );
}

//Sign Up with password page
"use client";
import React from "react";
import { Form, Input, Button, Typography, Layout, Space, Divider } from "antd";
import "antd/dist/reset.css";
import { useRouter } from "next/navigation";
import axios from "axios";
const { Content } = Layout;
const { Title, Text } = Typography;

interface PasswordProps {
  password: string;
}

export default function SignUpPassword() {
  const [form] = Form.useForm<PasswordProps>();
  const router = useRouter();
  const onFinish = async (values: PasswordProps) => {
    // router.push("/authenticate/signup/password/verify");
    const password = values.password;
    const emailData = localStorage.getItem("email");
    if (emailData) {
      const email = JSON.parse(emailData);
      console.log("password : ", password);
      console.log("Current email : ", email);
      const confirmPassword = password;
      try {
        const res = await axios.post(
          "https://localhost:7089/api/Users/SetPassword",
          {
            email: email,
            password: password,
          }
        );
        if (res.status === 200) {
          alert("Successfully register account");
          router.push("/authenticate/login");
        }
      } catch (error: any) {
        // alert(`Error  : ${error.message}`);
        console.error("Axios error:", error.response || error.message);
        alert(`Error : ${error.response?.data?.message || error.message}`);
      }
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
        maxWidth: "500px",
        marginBottom: "50px",
      }}
    >
      <Title
        level={3}
        style={{
          textAlign: "center",
          color: "#1B4372",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        Sign up
      </Title>
      <Text
        style={{
          display: "block",
          textAlign: "center",
          marginBottom: "24px",
          color: "#748291",
        }}
      >
        Start your journey on Livio and shape the future of your life.
      </Text>

      <Form form={form} layout="vertical" name="register" onFinish={onFinish}>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password style={{ borderRadius: "50px", padding: "8px" }} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password style={{ borderRadius: "50px", padding: "8px" }} />
        </Form.Item>

        {/* Confirm Button */}
        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            block
            style={{
              backgroundColor: "#1B4372",
              borderRadius: "50px",
              padding: "20px",
              color: "white",
              fontWeight: "bold",
            }}
            // onClick={() =>
            //   router.push("/authenticate/signup/password/verifyEmail")
            // }
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>

      {/* Divider */}
      <Divider plain>Or</Divider>

      {/* Google Sign-in Button */}
      <Button
        type="primary"
        icon={
          <img
            src="/google.png"
            alt="Google"
            style={{ width: 24, height: 24 }}
          />
        }
        block
        style={{
          backgroundColor: "rgba(3, 52, 110, 0.25)",
          borderColor: "rgba(3, 52, 110, 0.25)",
          fontWeight: "bold",
          borderRadius: "50px",
          padding: "20px",
        }}
      >
        Sign in with Google
      </Button>

      {/* Sign up link */}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Text style={{ color: "#748291" }}>
          Don't have an account? <a href="#">Sign Up</a>
        </Text>
      </div>
    </div>
  );
}

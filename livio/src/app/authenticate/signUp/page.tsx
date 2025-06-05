//Sign Up with email page
///link : authenticate/signUp
"use client";
import React from "react";
import { Form, Input, Button, Typography, Layout, Space, Divider } from "antd";
import "antd/dist/reset.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface EmailProps {
  email: string;
}

export default function SignUpEmail() {
  const [form] = Form.useForm<EmailProps>();
  const router = useRouter();
  const onFinish = async (values: EmailProps) => {
    console.log("Submit data:", values);
    try {
      const res = await axios.post(
        "https://localhost:7089/api/Users/Register",
        {
          email: values.email,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("email", JSON.stringify(values.email));
        toast("Successfully sent email confirm");
        router.push("/authenticate/signup/verify");
      }
    } catch (error: any) {
      toast.error(`Errror : ${error.message}`);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#F2F9FF",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          padding: "40px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "500px",
          marginBottom: "130px",
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
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              style={{ borderRadius: "50px", padding: "8px" }}
              placeholder="Enter Email"
            />
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
              // onClick={() => router.push('/authenticate/signUp/password')}
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
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

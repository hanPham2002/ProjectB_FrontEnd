//Login page
// link : authenticate/login
"use client";
import React from "react";
import { Form, Input, Button, Typography, Layout, Space, Divider } from "antd";
import "antd/dist/reset.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { router } from "next/client";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface LoginProps {
  email: string;
  password: string;
}
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
const buttonLoginStyles: React.CSSProperties = {
  backgroundColor: "#ADC1D7",
  color: "white",
  border: "100",
  fontWeight: "bold",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};
const buttonSignUpStyles: React.CSSProperties = {
  backgroundColor: "#ADC1D7",
  color: "white",
  border: "100",
  fontWeight: "bold",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

export default function Login() {
  const [form] = Form.useForm<LoginProps>();
  const router = useRouter();
  const onFinish = async (values: LoginProps) => {
    const { email, password } = values;
    try {
      const res = await axios.post("https://localhost:7089/api/Users/Login", {
        email,
        password,
      });
      if (res.status === 201 || res.status === 200) {
        alert("Succesfully login");
        localStorage.setItem("user", JSON.stringify(res.data));
        toast("Login successfully");
        router.push("/me");
      }
    } catch (error: any) {
      alert(`Error ${error.message}`);
    }
  };

  async function handleGoogle(credentialResponse: any) {
    try {
      console.log(credentialResponse);
      const idToken = credentialResponse.credential;

      console.log(idToken);
      if (idToken) {
        const res = await axios.post(
          "https://localhost:7089/api/Users/google-login",
          {
            idToken: idToken,
          }
        );
        const { token, name } = res.data;
        localStorage.setItem("user", JSON.stringify(res.data)); // Store the backend JWT
        router.push("/me");
      } else {
        alert("Cannot get the credentials");
      }

      // Redirect or update UI here
    } catch (err) {
      console.error("Backend login failed", err);
      alert("Google login failed. Please try again.");
    }
  }

  return (
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
          backgroundColor: "#F2F9FF",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "500px",
          marginBottom: "80px",
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
          Log In
        </Title>
        <Text
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "24px",
            color: "#748291",
          }}
        >
          Welcome back! Log in to stay updated with your financial and schedule
          management's.
        </Text>

        <Form
          form={form}
          layout="vertical" //cho label và form xuống dòng
          onFinish={onFinish}
        >
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

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <Input.Password
              style={{ borderRadius: "50px", padding: "8px" }}
              placeholder="Enter Password"
            />
          </Form.Item>

          {/* Forgot Password */}
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <a
              href="#"
              style={{ color: "#1B4372" }}
              onClick={() => router.push("/authenticate/forgotPassword")}
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              block
              style={{
                backgroundColor: "#1B4372",
                color: "white",
                fontWeight: "bold",
                borderRadius: "50px",
                padding: "20px",
              }}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>

        {/* Divider */}
        <Divider plain>Or</Divider>

        <GoogleLogin onSuccess={handleGoogle} />
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Text style={{ color: "#748291" }}>
            Don't have an account?
            <span
              onClick={() => router.push("signup")}
              style={{ color: "#007bff", cursor: "pointer" }}
            >
              Sign Up
            </span>
          </Text>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Content>
  );
}

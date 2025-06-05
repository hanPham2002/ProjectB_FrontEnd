"use client";
import { Button, Layout, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthenticateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  const router = useRouter();
  return (
    <GoogleOAuthProvider clientId="632507126049-olsukmqgjf7ko3240fddqeiedpnr23uu.apps.googleusercontent.com">
      <Layout style={layoutStyles}>
        {/* Header */}
        <Header style={headerStyles}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={540}
            height={114}
            style={logoStyles}
            priority
          />
          <Space>
            <Button
              type="default"
              style={{
                backgroundColor: "#5C7893",
                color: "white",
                border: "100",
              }}
              onClick={() => router.push("/authenticate/login")}
            >
              Log In
            </Button>
            <Button
              type="default"
              style={{
                backgroundColor: "#90A6BF",
                color: "black",
                border: "100",
              }}
              onClick={() => router.push("/authenticate/signup")}
            >
              Sign Up
            </Button>
          </Space>
        </Header>

        {children}
      </Layout>
    </GoogleOAuthProvider>
  );
}

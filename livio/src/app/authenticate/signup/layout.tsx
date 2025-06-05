"use client";
import { Layout } from "antd";
import React from "react";
const { Header, Content } = Layout;
const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      {children}
    </Content>
  );
};

export default SignUpLayout;

// app/account/layout.tsx
"use client";

import { Col, Layout, Menu, Row, Space, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, redirect } from "next/navigation";
import Image from "next/image";
import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Comfortaa } from "next/font/google";
import "../globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "700"], // tùy chỉnh mức độ đậm bạn muốn dùng
});
const { Header, Content, Sider, Footer } = Layout;

export default function UserDashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Protected Routes
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (!user) {
  //     redirect("/authenticate/login");
  //   }
  // }, []);
  const headerStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: "20px",
    backgroundColor: "#F2F9FF",
    height: 40,
    paddingTop: 10,
  };

  const contentStyles: React.CSSProperties = {
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    height: 1000,
    backgroundColor: "#F2F9FF",
    paddingBottom: 160,
  };

  const menuitems: React.CSSProperties = {
    height: "fit-content",
    width: "fit-content",
    marginBottom: "50px",
    padding: "13px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const layoutStyle = {
    width: "100%",
    height: "100vh",
    padding: 0,
    margin: 0,
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <Layout style={layoutStyle}>
        <Sider
          width={120}
          style={{
            backgroundColor: "#dce5ef",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", // or 'center' if you want everything vertically centered
            paddingTop: "20px",
          }}
        >
          <div style={{ width: "100%" }}>
            <div style={{}}>
              <Image
                src="/userAvartar.png"
                alt="Logo"
                width={80}
                height={80}
                style={{
                  borderRadius: "50%",
                  border: "3px solid ",
                  objectFit: "cover",
                }}
              />
            </div>

            <Menu
              mode="vertical"
              inlineCollapsed={true}
              defaultSelectedKeys={["profile"]}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
                backgroundColor: "#dce5ef",
                border: "none",
                padding: 0,
              }}
            >
              <Menu.Item
                style={menuitems}
                key="dashboard"
                icon={
                  <Image
                    src="/dashboardButton.png"
                    alt=" Dashboard Button"
                    width={30}
                    height={30}
                  />
                }
              />
              <Menu.Item
                style={menuitems}
                key="budget"
                icon={
                  <Image
                    src="/budgetButton.png"
                    alt="Budget Button"
                    width={35}
                    height={35}
                  />
                }
              />
              <Menu.Item
                style={menuitems}
                key="add"
                onClick={() => router.push("/authenticate/userDashboard/add")}
                icon={
                  <Image
                    src="/addButton.png"
                    alt="Add Button"
                    width={35}
                    height={35}
                  />
                }
              />
              <Menu.Item
                style={menuitems}
                key="calendar"
                onClick={() =>
                  router.push("/authenticate/userDashboard/schedule")
                }
                icon={
                  <Image
                    src="/calanderButton.png"
                    alt="calender Button"
                    width={35}
                    height={35}
                  />
                }
              />
              <Menu.Item
                style={menuitems}
                key="location_meal"
                onClick={() =>
                  router.push("/authenticate/userDashboard/userProfile")
                }
                icon={
                  <Image
                    src="/locationButton.png"
                    alt="Location Button"
                    width={35}
                    height={35}
                  />
                }
              />
            </Menu>
          </div>
        </Sider>
        <Layout>
          <Header style={headerStyles}>
            <Space.Compact>
              <Badge count={5} size="small" offset={[0, 2]}>
                <BellOutlined
                  style={{
                    fontSize: "25px",
                    color: "#333",
                    cursor: "pointer",
                    marginLeft: "10px",
                    marginTop: "4px",
                  }}
                />
              </Badge>
            </Space.Compact>
          </Header>
          <Content className={comfortaa.className} style={contentStyles}>
            <div
              style={{
                height: "10%",
                // backgroundColor: "green",
              }}
            >
              <h1
                style={{
                  color: "black",
                  fontSize: "30px",
                  height: "auto",
                  marginBottom: 50,
                  marginLeft: 50,
                }}
              >
                Account Information
              </h1>
            </div>
            <div
              style={{
                width: "100%",
                height: "85%",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "20%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 20,
                  alignItems: "center",
                }}
              >
                <div style={{ width: "100%", padding: 40, height: 130 }}>
                  <img
                    src="/userAvartar.png"
                    alt="Logo"
                    width={150}
                    height={150}
                    style={{
                      borderRadius: "50%",
                      border: "3px solid #fff",
                      objectFit: "cover",
                      marginBottom: 10,
                    }}
                  />
                </div>
                <div>
                  <h2
                    className={comfortaa.className}
                    style={{
                      color: "black",
                      fontSize: "20px",
                      marginTop: 0,
                      marginBottom: 0,
                      marginRight: 80,
                    }}
                  >
                    Chi Chi
                  </h2>
                </div>
              </div>
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "20%",
                    display: "flex",
                    paddingLeft: 20,
                    alignItems: "flex-start",
                    columnGap: 40,
                  }}
                >
                  <div
                    style={{
                      color: pathname === "/me" ? "#03346E" : "#B8B8B8",
                      fontSize: "26px",
                      width: "auto",
                      borderBottom:
                        pathname === "/me" ? "2px solid #03346E" : "none",
                      cursor: "pointer",
                      transition: "color 0.2s",
                      height: "90px",
                    }}
                    onClick={() => router.push("/me")}
                  >
                    Profile
                  </div>
                  <div
                    className={comfortaa.className}
                    style={{
                      color:
                        pathname === "/me/changePassword"
                          ? "#03346E"
                          : "#B8B8B8",
                      fontSize: "26px",
                      borderBottom:
                        pathname === "/me/changePassword"
                          ? "2px solid #03346E"
                          : "none",
                      cursor: "pointer",
                      transition: "color 0.2s",
                      height: "90px",
                    }}
                    onClick={() => router.push("/me/changePassword")}
                  >
                    Change Password
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "80%",
                    paddingLeft: 20,
                  }}
                >
                  {children}
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

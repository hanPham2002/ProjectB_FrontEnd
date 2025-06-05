// app/account/layout.tsx
"use client";

import {
  Avatar,
  Button,
  Col,
  Layout,
  Menu,
  Radio,
  Row,
  Space,
  theme,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Comfortaa } from "next/font/google";

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
  const headerStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: "20px",
    backgroundColor: "#F2F9FF",
    height: 64,
  };

  const contentStyles: React.CSSProperties = {
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#F2F9FF",
    paddingLeft: "20px",
    marginTop: "-50px",
  };

  const menuitems: React.CSSProperties = {
    height: "fit-content",
    width: "fit-content",
    marginBottom: "50px",
    padding: "13px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: '10px',
  };

  const menuicons: React.CSSProperties = {
    fontSize: "35px",
  };

  const footerStyles: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#F2F9FF",
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
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

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
                src="/avataradmin.jpeg"
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
                    // style={menuicons}
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
                    // style={menuicons}
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
                    // style={menuicons}
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
                    // style={menuicons}
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
                    // style={menuicons}
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
            <div>
              <h1 style={{ color: "black", fontSize: "30px" }}>
                Account Information
              </h1>
              <div style={{ marginTop: "-40px", width: "100%" }}>
                <Row style={{ width: "100%" }}>
                  <Col flex={2}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src="/avataradmin.jpeg"
                        alt="Logo"
                        width={150}
                        height={150}
                        style={{
                          borderRadius: "50%",
                          border: "3px solid ",
                          objectFit: "cover",
                          marginBottom: "0px",
                        }}
                      />
                      {/*User name*/}
                      <h1
                        className={comfortaa.className}
                        style={{
                          color: "black",
                          fontSize: "20px",
                          marginTop: "-30px",
                        }}
                      >
                        Anna
                      </h1>
                    </div>
                  </Col>
                  <Col flex={10} style={{ color: "black", marginTop: "-40px" }}>
                    <Row
                      justify="start"
                      style={{ marginLeft: 130, marginBottom: 50 }}
                    >
                      <div
                        className={comfortaa.className}
                        style={{
                          color: "#03346E",
                          fontSize: "26px",
                          marginRight: 50,
                          height: 80,
                          borderBottom: "2px solid #03346E",
                          display: "inline-block",
                          width: "fit-content",
                          paddingBottom: 4,
                          cursor: "pointer",
                        }}
                      >
                        Profile
                      </div>
                    </Row>
                    <Row justify="start">{children}</Row>
                  </Col>
                </Row>
              </div>
            </div>
          </Content>
          <Footer style={footerStyles}>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

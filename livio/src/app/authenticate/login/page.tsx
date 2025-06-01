//Login page
// link : authenticate/login
'use client'
import React from 'react';
import { Form, Input, Button, Typography, Layout, Space, Divider } from 'antd';
import 'antd/dist/reset.css';
import { useRouter } from 'next/navigation'
import Image from "next/image";
import {router} from "next/client";


const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface LoginProps {
    email: string;
    password: string;
}
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
const buttonLoginStyles: React.CSSProperties = {
    backgroundColor: '#ADC1D7',
    color: 'white',
    border: '100',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};
const buttonSignUpStyles: React.CSSProperties = {
    backgroundColor: '#ADC1D7',
    color: 'white',
    border: '100',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};


export default function Login() {
    const [form] = Form.useForm<LoginProps>();
    const router = useRouter()
    const onFinish = (values: LoginProps) => {
        console.log('Submit data:', values);
    };

    return (
        <Layout style={layoutStyles}>
            {/* Header */}
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
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' }}>
                <div style={{
                    backgroundColor: '#F2F9FF',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    width: '100%',
                    maxWidth: '500px',
                    marginBottom:'80px'
                }}>
                    <Title level={3} style={{ textAlign: 'center', color: '#1B4372', fontSize:'25px',fontWeight: 'bold' }}>Log In</Title>
                    <Text style={{ display: 'block', textAlign: 'center', marginBottom: '24px',color:'#748291' }}>
                        Welcome back! Log in to stay updated with your financial and schedule management's.
                    </Text>

                    <Form
                        form={form}
                        layout="vertical"  //cho label và form xuống dòng
                        onFinish={onFinish}
                    >
                        {/* Email */}
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input style={{borderRadius: '50px',padding:'8px'}} placeholder="Enter Email" />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Enter your password' }]}
                        >
                            <Input.Password style={{borderRadius: '50px', padding:'8px'}} placeholder="Enter Password" />
                        </Form.Item>

                        {/* Forgot Password */}
                        <div style={{ textAlign: 'right', marginBottom: '10px' }}>

                            <a href="#" style={{ color: '#1B4372' }}  onClick={() => router.push('/authenticate/forgotPassword')}>Forgot Password?</a>
                        </div>

                        {/* Login Button */}
                        <Form.Item>
                            <Button
                                type="default"
                                htmlType="submit"
                                block
                                style={{ backgroundColor: '#1B4372',color:'white',fontWeight:"bold", borderRadius: '50px',padding: '20px' }}
                            >
                                Log In
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Divider */}
                    <Divider plain>Or</Divider>

                    {/* Google Sign-in Button */}
                    <Button
                        type="default"
                        icon={<img src="/google.png" alt="Google" style={{ width: 24, height: 24 }} />}
                        block
                        style={{ backgroundColor: "#839EBC", fontWeight: 'bold', borderRadius: '50px',padding: '20px', color: "white" }}
                    >
                        Sign in with Google
                    </Button>

                    {/* Sign up link */}
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <Text style={{color:'#748291'}}>Don't have an account?
                            <span
                                onClick={() => router.push('/authenticate/signUp')}
                                style={{ color: '#007bff', cursor: 'pointer' }}
                        > Sign Up
                            </span>
                        </Text>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

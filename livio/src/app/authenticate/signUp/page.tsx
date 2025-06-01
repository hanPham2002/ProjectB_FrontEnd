//Sign Up with email page
///link : authenticate/signUp
'use client'
import React from 'react';
import { Form, Input, Button, Typography, Layout, Space, Divider } from 'antd';
import 'antd/dist/reset.css';
import { useRouter } from 'next/navigation'
import Image from "next/image";
const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface EmailProps {
    email: string;
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
export default function SignUpEmail() {
    const [form] = Form.useForm<EmailProps>();
    const router = useRouter();
    const onFinish = (values: EmailProps) => {
        console.log('Submit data:', values);
        //sau khi đã có email
        router.push('/authenticate/signUp/password')
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
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    padding: '40px',
                    borderRadius: '10px',
                    width: '100%',
                    maxWidth: '500px',
                    marginBottom:'130px'
                }}>
                    <Title level={3} style={{ textAlign: 'center', color: '#1B4372', fontSize:'25px',fontWeight: 'bold' }}>Sign up</Title>
                    <Text style={{ display: 'block', textAlign: 'center', marginBottom: '24px',color:'#748291' }}>
                        Start your journey on Livio and shape the future of your life.
                    </Text>

                    <Form
                        form={form}
                        layout="vertical"
                        name="register"
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

                        {/* Confirm Button */}
                        <Form.Item>
                            <Button
                                type="default"
                                htmlType="submit"
                                block
                                style={{ backgroundColor: '#1B4372',  borderRadius: '50px',padding: '20px',color:"white" , fontWeight: 'bold' }}
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
                        icon={<img src="/google.png" alt="Google" style={{ width: 24, height: 24 }} />}
                        block
                        style={{ backgroundColor: 'rgba(3, 52, 110, 0.25)',borderColor: 'rgba(3, 52, 110, 0.25)', fontWeight: 'bold', borderRadius: '50px',padding: '20px' }}
                    >
                        Sign in with Google
                    </Button>


                </div>
            </Content>
        </Layout>
    );
}

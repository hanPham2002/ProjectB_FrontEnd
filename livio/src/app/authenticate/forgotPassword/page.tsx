//Forgot password (enter email)
//forgotpassword
'use client'
import React, {JSX} from "react";
import 'antd/dist/reset.css';
import {Button, Divider, Form, Input, Layout, Space, Typography} from "antd";
import Image from "next/image";
import {router} from "next/client";
import {useRouter} from "next/navigation";

const {Header,Content} = Layout;
const {Title,Text } = Typography;
//interface
interface EmailProps {
    email: string;
}
// AntDesign
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

export  default  function ForgotPassword(): JSX.Element {
    const [form] = Form.useForm<EmailProps>();
    const router = useRouter();
    const onFinish =(values: EmailProps ) => {
        console.log("Submit data:" ,values);
    }
return(
    <Layout style={layoutStyles}>
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

        {/*Main Containt*/}

        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', marginBottom: '200px' }}>
            <div style={{
                backgroundColor: '#F2F9FF',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                padding: '40px',
                borderRadius: '10px',
                width: '100%',
                maxWidth: '500px',
                marginTop: '10px'
            }}>
                <Title  style={{ textAlign: 'center', color: '#1B4372', fontSize:'25px',fontWeight: 'bold', paddingBottom:'40px' }}>Forgot password</Title>

                <Form
                    form={form}
                    layout="vertical"
                    name="register"
                    onFinish={onFinish}
                >
                    {/* Email */}
                    <Form.Item
                        // label= {<span style={{ fontSize: '18px', fontFamily: 'Georgia, serif', fontWeight: 'bold' }}>Your Email</span>}
                        label= {<span style={{ fontSize: '15px', fontWeight: 'bold', color:"#2C2A29" }}>Your Email</span>}
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
                            style={{ backgroundColor: '#1B4372',  borderRadius: '50px',padding: '20px',color:"white"  }}
                        >

                            Confirm
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </Content>

    </Layout>
)
}
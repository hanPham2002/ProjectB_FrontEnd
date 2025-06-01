// View User profile + edit Profile
//admin profile
'use client'
import React, {useState} from 'react';
import {Button, DatePicker, FormProps, Select} from 'antd';
import {Col, Row, Form, Input} from "antd";
import { Comfortaa } from 'next/font/google';


const comfortaa = Comfortaa({
    subsets: ['latin'],
    weight: ['700', '700'],
});
const labelCol = {
    fontWeight: 'bold',
    fontSize: 16,
    color:'#434647'
};

type FieldType = {
    fullName?: string;
    dob?: string;
    gender?: string;
    address?: string;
    phone?: string;
    email?: string;
};


const Page = () => {
    const [isEditing, setEditing] = useState(false);
    const [form] = Form.useForm();
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        setEditing(false); // tắt chế độ chỉnh sửa sau khi lưu
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };
    return (
        <div style={{width:'100%', marginLeft:'120px' }}>
            <Form
                form={form}
                name="profile"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row gutter={64} style={{ width: '70%' }}>
                    <Col flex={1}>
                        <Form.Item
                            label={<span style={labelCol}>Full Name</span>}
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input style={ {height:40}} disabled={!isEditing}/>
                        </Form.Item>
                        <Form.Item   label={<span style={labelCol}>Email</span>} name="email" rules={[{ required: true, message: 'Please select your phone email!' }]}>
                            <Input style={{height:40}} disabled={!isEditing}/>
                        </Form.Item>
                        <Form.Item
                            label={<span style={labelCol}>Date of birth </span>}
                            name="dob"
                            rules={[{ required: true, message: 'Please select your date of birth!' }]}
                        >
                            <DatePicker
                                style={{ width: '50%', height: 40 }}
                                format="DD/MM/YYYY"
                                disabled={!isEditing}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span style={labelCol}>Gender</span>}
                            name="gender"
                            rules={[{ required: true, message: 'Please select your gender!' }]}
                        >
                            <Select options={[
                                { label: 'female', value: 'female' },
                                { label: 'male', value: 'male' },

                            ]}  style={{height:40, }} disabled={!isEditing}/>
                        </Form.Item>
                    </Col>

                    <Col flex={1}>
                        <Form.Item
                            label={<span style={labelCol}>Address </span>}
                            name="address"
                            rules={[{  message: 'Please select your address!' }]}>

                            <Input style={{height:40}} disabled={!isEditing}/>
                        </Form.Item>

                        <Form.Item
                            label={<span style={labelCol}>Phone number</span>}
                            name="phone"
                            rules={[{ message: 'Please select your phone number!' }]}>
                            <Input style={{height:40}} disabled={!isEditing}/>
                        </Form.Item>


                        <Form.Item
                            label={<span style={labelCol}>Role</span>}
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input style={{height:40}} disabled={!isEditing}/>
                        </Form.Item>
                    </Col>
                </Row>
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    {isEditing ? ( <>
                        <Button className={comfortaa.className} type="primary" htmlType="submit" style={{
                            backgroundColor: '#0c2c52',
                            borderRadius: 24,
                            padding: '8px 36px',
                            fontWeight: 'bold',
                            letterSpacing: 1,
                            marginRight:'15px',
                            boxShadow: '3px -1px 25px 2px rgba(0,0,0,0.17) inset'

                        }} >
                            SAVE
                        </Button>
                        <Button className={comfortaa.className} type="primary" htmlType="button"  style={{
                            backgroundColor: '#FFFFFF',
                            color: '#0c2c52',
                            borderRadius: 24,
                            padding: '8px 36px',
                            fontWeight: 'bold',
                            letterSpacing: 1,
                            marginRight:'500px',
                            borderColor:'#0c2c52',
                            boxShadow: '3px -1px 25px 2px rgba(0,0,0,0.07) inset'
                        }} onClick={(e) => {
                            e.preventDefault();
                            setEditing(false);
                            form.resetFields()
                        }}>
                            CANCEL
                        </Button>
                    </>) : ( <Button className={comfortaa.className} type="primary"  htmlType="button" style={{
                        backgroundColor: '#0c2c52',
                        borderRadius: 24,
                        padding: '8px 36px',
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        marginRight:'500px',
                        boxShadow: '3px -1px 25px 2px rgba(0,0,0,0.17) inset'
                    }}onClick={(e) => {
                        e.preventDefault();
                        setEditing(!isEditing);
                    }}>
                        EDIT PROFILE
                    </Button>)}
                </div>
            </Form>

        </div>


    );
};

export default Page;
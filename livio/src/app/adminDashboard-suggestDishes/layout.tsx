'use client'
//layout manageCategories
import React, {useState} from "react";
import {Col, Row,Input, Space,Button} from "antd";
import type { GetProps } from 'antd';
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import { Comfortaa } from 'next/font/google';


const comfortaa = Comfortaa({
    subsets: ['latin'],
    weight: ['400', '700'], // tùy chỉnh mức độ đậm bạn muốn dùng
});

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = (path: string) => pathname === path;


    const titleStyles: React.CSSProperties = {
        color: '#03346E',
        marginLeft: 40,

    };
    const menuStyles : React.CSSProperties={
        marginLeft:90,
        height: 60,
        marginTop: -10,
        width: 'fit-content',

    }


    const textMenuStyles: React.CSSProperties={
        color: pathname === '/adminDashboard-userList' ? "#03346E" : "#636668",
        fontSize: '20px',
        marginRight:50,
        height: 80,
        borderBottom: pathname === '/adminDashboard-userList' ? '2px solid #03346E' : 'none',
        display: 'inline-block',
        width: 'fit-content',
        paddingBottom: 4,
        cursor: 'pointer',
        paddingTop: 15,

    }

    return (
        <html lang="en" style={{ height: "100vh", width: "100%" }}>

        <body className={comfortaa.className} style={{ backgroundColor: '#F2F9FF' }}>
        <div>
            <h1 className={comfortaa.className} style={titleStyles}>Admin page</h1>
        </div>
        <div >
            <Col >
                <Row   style={menuStyles}>
                    <div
                        className={comfortaa.className}
                        style={{
                            ...textMenuStyles,
                            color: isActive('/adminDashboard-userList') ? "#03346E" : "#636668",
                            borderBottom: isActive('/adminDashboard-userList') ? '2px solid #03346E' : 'none',
                        }}
                        onClick={() => router.push('/adminDashboard-userList')}
                    >
                        User List
                    </div>

                    <div
                        className={comfortaa.className}
                        style={{
                            ...textMenuStyles,
                            color: isActive('/adminDashboard-suggestDishes') ? "#03346E" : "#636668",
                            borderBottom: isActive('/adminDashboard-suggestDishes') ? '2px solid #03346E' : 'none',
                        }}
                        onClick={() => router.push('/adminDashboard-suggestDishes')}
                    >
                        Suggest Dishes
                    </div>

                    <div
                        className={comfortaa.className}
                        style={{
                            ...textMenuStyles,
                            color: isActive('/adminDashboard-suggestLocation') ? "#03346E" : "#636668",
                            borderBottom: isActive('/adminDashboard-suggestLocation') ? '2px solid #03346E' : 'none',
                        }}
                        onClick={() => router.push('adminDashboard-suggestLocation')}
                    >
                        Suggest Location
                    </div>
                    <div
                        className={comfortaa.className}
                        style={{
                            ...textMenuStyles,
                            color: isActive('/adminDashboard-manageCategories') ? "#03346E" : "#636668",
                            borderBottom: isActive('/adminDashboard-manageCategories') ? '2px solid #03346E' : 'none',
                        }}
                        onClick={() => router.push('/adminDashboard-manageCategories')}
                    >
                        Manage Categories 
                    </div>
                    <Space className={comfortaa.className} direction="vertical">
                        <Search  placeholder="Search categoty, name ...."
                                 onSearch={onSearch}
                                 className={`custom-search ${comfortaa.className}`}
                                 size="large"
                        />
                    </Space>

                    {/*nút add new*/}
                    <Button
                        type="primary"
                        icon={
                            <Image
                                src="/addButton.png"
                                alt="Add Button"
                                width={23}
                                height={23}
                                style={{
                                    filter: 'invert(1)'
                                    // invert(1) hay invert(100%): đảo toàn bộ màu (đen → trắng, trắng → đen).
                                }}
                            />
                        }
                        style={{
                            backgroundColor: '#123E70',
                            borderRadius: 25,
                            height: 45,
                            paddingInline: 20,
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 50,
                            fontSize:20,
                            marginTop: 2
                        }}
                        className={comfortaa.className}
                    >
                        Add new
                    </Button>
                    <Button
                        type="primary"
                        icon={
                            <Image
                                src="/filterIcon.png"
                                alt="filter Button"
                                width={23}
                                height={23}
                            />
                        }
                        style={{
                            backgroundColor: '#123E70',
                            borderRadius: 25,
                            height: 45,
                            paddingInline: 20,
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 30,
                            fontSize:20,
                            marginTop: 2
                        }}
                        className={comfortaa.className}
                    >
                        Filters
                    </Button>

                </Row>

            </Col>

        </div>
        {children}
        </body>
        </html>
    );
}

//admin page - user list
'use client'
import React, {useState} from 'react';
import {Checkbox, ConfigProvider, Layout, Modal, Tooltip} from "antd";
import { Table,Button, message, Popconfirm } from 'antd';
import type { TableProps,PopconfirmProps } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Comfortaa } from 'next/font/google';

const comfortaa = Comfortaa({
    subsets: ['latin'],
    weight: ['400', '700'], // tùy chỉnh mức độ đậm bạn muốn dùng
});

interface OpeningTime {
    start: string; // "06:00"
    end: string;   // "12:00"
}

interface DataType {
    key: string;
    id: string;
    title : string;
    image: string;
    phoneNumber: string;
    address: string;
    description: string;
    openingTime: OpeningTime;


}

const data: DataType[] = [
    {
        key: '1',
        id: '1',
        title : 'Banh Mi ',
        image: '/banhmi.png',
        phoneNumber:' 0938133989',
        address:' 50 Hung Vuong,Thu Dau Mot, Binh Duong',
        description:'The water here is delicious, the staff is friendly.',
        openingTime: {
            start:"06:00",
            end: '12:00'
        }
    },
    {
        key: '1',
        id: '1',
        title : 'Banh Mi ',
        image: '/banhmi.png',
        phoneNumber:' 0938133989',
        address:' 50 Hung Vuong,Thu Dau Mot, Binh Duong',
        description:'The water here is delicious, the staff is friendly.',
        openingTime: {
            start:"06:00",
            end: '12:00'
        }
    },
    {
        key: '1',
        id: '1',
        title : 'Banh Mi ',
        image: '/banhmi.png',
        phoneNumber:' 0938133989',
        address:' 50 Hung Vuong,Thu Dau Mot, Binh Duong',
        description:'The water here is delicious, the staff is friendly.',
        openingTime: {
            start:"06:00",
            end: '12:00'
        }
    },
    {
        key: '1',
        id: '1',
        title : 'Banh Mi ',
        image: '/banhmi.png',
        phoneNumber:' 0938133989',
        address:' 50 Hung Vuong,Thu Dau Mot, Binh Duong',
        description:'The water here is delicious, the staff is friendly.',
        openingTime: {
            start:"06:00",
            end: '12:00'
        }
    },
    {
        key: '1',
        id: '1',
        title : 'Banh Mi ',
        image: '/banhmi.png',
        phoneNumber:' 0938133989',
        address:' 50 Hung Vuong,Thu Dau Mot, Binh Duong',
        description:'The water here is delicious, the staff is friendly.',
        openingTime: {
            start:"06:00",
            end: '12:00'
        }
    },
];
export default function SignUpEmail() {
    const [tableData, setTableData] = useState<DataType[]>(data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCategoryName
        , setCategoryName
    ] = useState<DataType | null>(null);

// hai popconfirm của delete và edit
    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Click on No');
    };


    // hàm delete
    const handleDelete = (record: DataType) => {
        setTableData(prev => prev.filter(item => item.key !== record.key));
        message.success(`Deleted ${record.title}`);
    };


    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render:(text) => <strong>{text}</strong>
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
            render:(text) => <strong>{text}</strong>
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render:(src,record) =>(
                <img
                    src={src}
                    alt={record.title}
                    style={{ width: 70, height: 70, borderRadius: 30 }}
                />
            )
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            align: 'center',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            align: 'center',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_,record) => (
                <div style={{ display: 'flex',justifyContent:"center", gap: '15px' }}>
                    <Tooltip title="Edit">
                        <EditOutlined style={{ color: '#1890ff',cursor: 'pointer', fontSize: '18px' }}
                                     />
                        {/*onClick={() => handleEdit(record)}*/}
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Popconfirm  title="Delete"
                                     description="Are you sure to delete this account?"
                                     onConfirm={() => handleDelete(record)}
                                     onCancel={cancel}
                                     okText="Yes"
                                     cancelText="No">
                            <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '18px' }} />
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        }

    ];

    return (
        <div className={comfortaa.className} style={{fontSize:10}}>
            <ConfigProvider
                theme={{
                    token:{
                        fontFamily:'Comfortaa, cursive',},
                }}
            >
                <Layout className="custom-layout" style={{ backgroundColor:'#DCE5F2'}}>
                    <div style={{  backgroundColor:'#DCE5F2',borderRadius:30 , marginLeft:20, marginRight:20 }}>
                        <Table  className="custom-table-wrapper"  columns={columns} dataSource={tableData} />;

                    </div>
                    {/*modal khi click edit*/}
                    {/*<div >*/}
                    {/*    <Modal*/}
                    {/*        title={<span style={{ color: 'black', fontWeight: 'bold' }}>Edit Account Status</span>}*/}
                    {/*        open={isModalOpen}*/}
                    {/*        onOk={() => setIsModalOpen(false)}*/}
                    {/*        onCancel={() => {*/}
                    {/*            setIsModalOpen(false);*/}
                    {/*            setSelectedStatus(null);}}*/}
                    {/*        footer={[*/}
                    {/*            <Button key="cancel" onClick={() => {*/}
                    {/*                setIsModalOpen(false);*/}
                    {/*                setSelectedStatus(null);*/}
                    {/*            }}>*/}
                    {/*                Cancel*/}
                    {/*            </Button>,*/}
                    {/*            <Button*/}
                    {/*                key="update"*/}
                    {/*                type="primary"*/}
                    {/*                onClick={() => {*/}
                    {/*                    if (editCategoryName*/}
                    {/*                        && selectedStatus) {*/}
                    {/*                        const updatedData = tableData.map(user =>*/}
                    {/*                            user.key === editCategoryName*/}
                    {/*                                .key*/}
                    {/*                                ? { ...user, status: selectedStatus }*/}
                    {/*                                : user*/}
                    {/*                        );*/}
                    {/*                        setTableData(updatedData);*/}
                    {/*                        setIsModalOpen(false);*/}
                    {/*                        setSelectedStatus(null);*/}
                    {/*                        // message.success(`Updated category name to ${selectedStatus} for ${editCategoryName*/}
                    {/*                        //     .fullName}`);*/}
                    {/*                    } else {*/}
                    {/*                        message.warning('Please select a status');*/}
                    {/*                    }*/}
                    {/*                }}*/}
                    {/*            >*/}
                    {/*                Update*/}
                    {/*            </Button>,*/}
                    {/*        ]}*/}
                    {/*    >*/}
                    {/*        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>*/}
                    {/*            <Checkbox*/}
                    {/*                checked={selectedStatus === 'Active'}*/}
                    {/*                onChange={() => handleStatusChange('Active')}*/}
                    {/*                style={{  }}*/}
                    {/*            >*/}
                    {/*                Active*/}
                    {/*            </Checkbox>*/}
                    {/*            <Checkbox*/}
                    {/*                checked={selectedStatus === 'Pending Verification'}*/}
                    {/*                onChange={() => handleStatusChange('Pending Verification')}*/}
                    {/*                style={{}}*/}
                    {/*            >*/}
                    {/*                Pending Verification*/}
                    {/*            </Checkbox>*/}
                    {/*            <Checkbox*/}
                    {/*                checked={selectedStatus === 'Banned'}*/}
                    {/*                onChange={() => handleStatusChange('Banned')}*/}
                    {/*                style={{  }}*/}
                    {/*            >*/}
                    {/*                Banned*/}
                    {/*            </Checkbox>*/}
                    {/*        </div>*/}
                    {/*    </Modal>*/}
                    {/*</div>*/}

                </Layout>

            </ConfigProvider>
        </div>

    );
}

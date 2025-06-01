//admin page - manage categories
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


interface DataType {
    key: string;
    id: string;
    username: string;
    fullName: string;
    email: string;
    roles: string;
    registrationDate: string;
    lastLogin: string;
    status: string;
}

const data: DataType[] = [
    {
        key: '1',
        id: '1',
        username: 'Anna',
        fullName: 'Anna Hilton',
        email: 'chi.cit20@eiu.edu.vn',
        roles: 'Admin & User',
        registrationDate: '26 October, 2023',
        lastLogin: '1 day ago',
        status: 'Banned',
    },
    {
        key: '2',
        id: '2',
        username: 'David',
        fullName: 'David Watson',
        email: 'david20@eiu.edu.vn',
        roles: 'User',
        registrationDate: '2 December, 2024',
        lastLogin: '2 minutes ago',
        status: 'Active',
    },
    {
        key: '3',
        id: '3',
        username: 'Steven',
        fullName: 'Stven Gwen',
        email: 'steven@eiu.edu.vn',
        roles: 'User',
        registrationDate: '27 December, 2024',
        lastLogin: '3 March, 2025',
        status: 'Active',
    },
    {
        key: '4',
        id: '4',
        username: 'John',
        fullName: 'John Ryan',
        email: 'john.Ryan@eiu.edu.vn',
        roles: 'User',
        registrationDate: '6 January , 2025',
        lastLogin: '1 week ago',
        status: 'Pending Verification',
    },
    {
        key: '5',
        id: '5',
        username: 'Serena',
        fullName: 'Serena',
        email: 'serena@eiu.edu.vn',
        roles: 'User',
        registrationDate: '6 January , 2025',
        lastLogin: '10 minutes ago',
        status: 'Active',
    },
    {
        key: '6',
        id: '6',
        username: 'Steven',
        fullName: 'Stven Gwen',
        email: 'steven@eiu.edu.vn',
        roles: 'User',
        registrationDate: '27 December, 2024',
        lastLogin: '3 March, 2025',
        status: 'Active',
    },
    {
        key: '7',
        id: '7',
        username: 'John',
        fullName: 'John Ryan',
        email: 'john.Ryan@eiu.edu.vn',
        roles: 'User',
        registrationDate: '6 January , 2025',
        lastLogin: '1 week ago',
        status: 'Pending Verification',
    },
    {
        key: '8',
        id: '8',
        username: 'Serena',
        fullName: 'Serena',
        email: 'serena@eiu.edu.vn',
        roles: 'User',
        registrationDate: '6 January , 2025',
        lastLogin: '10 minutes ago',
        status: 'Active',
    },
    {
        key: '9',
        id: '9',
        username: 'Steven',
        fullName: 'Stven Gwen',
        email: 'steven@eiu.edu.vn',
        roles: 'User',
        registrationDate: '27 December, 2024',
        lastLogin: '3 March, 2025',
        status: 'Active',
    },
    {
        key: '10',
        id: '10',
        username: 'John',
        fullName: 'John Ryan',
        email: 'john.Ryan@eiu.edu.vn',
        roles: 'User',
        registrationDate: '6 January , 2025',
        lastLogin: '1 week ago',
        status: 'Pending Verification',
    },
    {
        key: '11',
        id: '11',
        username: 'Serena',
        fullName: 'Serena',
        email: 'serena@eiu.edu.vn',
        roles: 'User',
        registrationDate: '6 January , 2025',
        lastLogin: '10 minutes ago',
        status: 'Active',
    },
];
export default function SignUpEmail() {
    const [tableData, setTableData] = useState<DataType[]>(data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<DataType | null>(null);
    // hai popconfirm của delete và edit
    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    // Hàm mở Modal khi click Edit:
    // record chính là dữ liệu của một hàng (row) trong bảng antd Table. Khi bạn click vào biểu tượng EditOutlined ở một dòng cụ thể, record sẽ chứa toàn bộ thông tin của dòng đó.
    const handleEdit = (record: DataType) => {
        setEditingUser(record);
        setIsModalOpen(true);
    };

    // hàm delete
    const handleDelete = (record: DataType) => {
        setTableData(prev => prev.filter(item => item.key !== record.key));
        message.success(`Deleted ${record.fullName}`);
    };
    //hàm khi change status thì  nó sẽ set và đổ lại lên account status
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render:(text) => <strong>{text}</strong>
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            render:(text) => <strong>{text}</strong>
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            align: 'center',
            render:(text) => <strong>{text}</strong>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            align: 'center',
        },
        {
            title: 'Registration Date',
            dataIndex: 'registrationDate',
            key: 'registrationDate',
            align: 'center',
        },
        {
            title: 'Last Login',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
            align: 'center',
        },
        {
            title: 'Account Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => {
                let color = '';
                if (status === 'Active') color = 'green';
                else if (status === 'Banned') color = 'red';
                else if (status === 'Pending Verification') color = 'orange';

                return <span style={{ color }}>{status}</span>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_,record) => (
                <div style={{ display: 'flex', justifyContent:'center', gap: '15px' }}>
                    <Tooltip title="Edit">
                        <EditOutlined style={{ color: '#1890ff', cursor: 'pointer', fontSize: '18px' }}   onClick={() => handleEdit(record)}/>
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
                    <div >
                        <Modal
                            title={<span style={{ color: 'black', fontWeight: 'bold' }}>Edit Account Status</span>}
                            open={isModalOpen}
                            onOk={() => setIsModalOpen(false)}
                            onCancel={() => {
                                setIsModalOpen(false);
                                setSelectedStatus(null);}}
                            footer={[
                                <Button key="cancel" onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedStatus(null);
                                }}>
                                    Cancel
                                </Button>,
                                <Button
                                    key="update"
                                    type="primary"
                                    onClick={() => {
                                        if (editingUser && selectedStatus) {
                                            const updatedData = tableData.map(user =>
                                                user.key === editingUser.key
                                                    ? { ...user, status: selectedStatus }
                                                    : user
                                            );
                                            setTableData(updatedData);
                                            setIsModalOpen(false);
                                            setSelectedStatus(null);
                                            message.success(`Updated status to ${selectedStatus} for ${editingUser.fullName}`);
                                        } else {
                                            message.warning('Please select a status');
                                        }
                                    }}
                                >
                                    Update
                                </Button>,
                            ]}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <Checkbox
                                    checked={selectedStatus === 'Active'}
                                    onChange={() => handleStatusChange('Active')}
                                    style={{  }}
                                >
                                    Active
                                </Checkbox>
                                <Checkbox
                                    checked={selectedStatus === 'Pending Verification'}
                                    onChange={() => handleStatusChange('Pending Verification')}
                                    style={{}}
                                >
                                    Pending Verification
                                </Checkbox>
                                <Checkbox
                                    checked={selectedStatus === 'Banned'}
                                    onChange={() => handleStatusChange('Banned')}
                                    style={{  }}
                                >
                                    Banned
                                </Checkbox>
                            </div>
                        </Modal>
                    </div>

                </Layout>

            </ConfigProvider>
        </div>

    );
}

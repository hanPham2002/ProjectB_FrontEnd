"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  ConfigProvider,
  Layout,
  Modal,
  Radio,
  Tooltip,
  Table,
  Button,
  message,
  Popconfirm,
} from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Comfortaa } from "next/font/google";
import axios from "axios";
import dayjs from "dayjs"; // Import dayjs for date formatting

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface DataType {
  userId: string;
  name: string;
  email: string;
  status: number;
  avatar: string | null;
  description: string | null;
  createdTime: Date;
  roles: string[];
}

// Map status number to text and color
const statusMap: Record<number, { text: string; color: string }> = {
  0: { text: "Pending Verification", color: "orange" },
  1: { text: "Active", color: "green" },
  2: { text: "Banned", color: "red" },
};

export default function UserManagementPage() {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<DataType | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // Memoize fetchUserData to prevent unnecessary re-renders
  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<DataType[]>(
        "https://localhost:7089/api/Users"
      );
      setTableData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]); // Dependency array includes fetchUserData

  const handleEdit = (record: DataType) => {
    setEditingUser(record);
    setSelectedStatus(record.status);
    setIsModalOpen(true);
  };

  const handleDelete = async (record: DataType) => {
    try {
      // Assuming there's an API endpoint for deleting users
      // await axios.delete(`https://localhost:7089/api/Users/${record.userId}`);
      setTableData((prev) =>
        prev.filter((item) => item.userId !== record.userId)
      );
      message.success(`User ${record.name} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error(`Failed to delete user ${record.name}.`);
    }
  };

  const handleStatusChange = (e: any) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    if (editingUser && selectedStatus !== null) {
      // Optimistically update the UI
      const updatedData = tableData.map((user) =>
        user.userId === editingUser.userId
          ? { ...user, status: selectedStatus }
          : user
      );
      setTableData(updatedData);
      setIsModalOpen(false);
      setSelectedStatus(null);
      message.success(
        `Updated status to ${
          statusMap[selectedStatus]?.text || "Unknown"
        } for ${editingUser.name}`
      );

      // In a real application, you'd make an API call here to persist the change:
      // try {
      //   await axios.put(`https://localhost:7089/api/Users/${editingUser.userId}/status`, { status: selectedStatus });
      //   message.success(`Updated status to ${statusMap[selectedStatus]?.text} for ${editingUser.name}`);
      // } catch (error) {
      //   console.error("Error updating user status:", error);
      //   message.error(`Failed to update status for ${editingUser.name}.`);
      //   // Revert UI if API call fails
      //   setTableData(prevData => prevData.map(user =>
      //     user.userId === editingUser.userId ? { ...user, status: editingUser.status } : user
      //   ));
      // }
    } else {
      message.warning("Please select a status.");
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      align: "center",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      align: "center",
      render: (roles: string[]) => roles.join(", "),
    },
    {
      title: "Account Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: number) => {
        const statusInfo = statusMap[status] || {
          text: "Unknown",
          color: "gray",
        };
        return (
          <span style={{ color: statusInfo.color }}>{statusInfo.text}</span>
        );
      },
    },
    {
      title: "Registration Date",
      dataIndex: "createdTime",
      key: "createdTime",
      align: "center",
      render: (createdTime: Date) =>
        dayjs(createdTime).format("YYYY-MM-DD HH:mm"), // Format date
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Tooltip title="Edit">
            <EditOutlined
              style={{ color: "#1890ff", cursor: "pointer", fontSize: "18px" }}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete"
              description="Are you sure you want to delete this account?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                style={{ color: "red", cursor: "pointer", fontSize: "18px" }}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className={comfortaa.className} style={{ fontSize: 12 }}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Comfortaa, cursive",
          },
        }}
      >
        <Layout
          className="custom-layout"
          style={{ backgroundColor: "#DCE5F2" }}
        >
          <div
            style={{
              backgroundColor: "#DCE5F2",
              borderRadius: 30,
              marginLeft: 20,
              marginRight: 20,
              padding: 20,
            }}
          >
            <Table
              className="custom-table-wrapper"
              columns={columns}
              dataSource={tableData}
              rowKey="userId"
              pagination={{ pageSize: 6 }}
              loading={loading} // Apply loading state to the table
            />
          </div>

          <Modal
            title={
              <span style={{ color: "black", fontWeight: "bold" }}>
                Edit Account Status
              </span>
            }
            open={isModalOpen}
            onOk={handleUpdateStatus}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedStatus(null);
            }}
            footer={[
              <Button
                key="cancel"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedStatus(null);
                }}
              >
                Cancel
              </Button>,
              <Button key="update" type="primary" onClick={handleUpdateStatus}>
                Update
              </Button>,
            ]}
          >
            <Radio.Group onChange={handleStatusChange} value={selectedStatus}>
              <Radio value={1}>Active</Radio>
              <Radio value={0}>Pending Verification</Radio>
              <Radio value={2}>Banned</Radio>
            </Radio.Group>
          </Modal>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

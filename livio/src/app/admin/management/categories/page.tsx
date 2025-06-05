//admin page - user list
"use client";
import React, { useState } from "react";
import { Checkbox, ConfigProvider, Layout, Modal, Tooltip } from "antd";
import { Table, Button, message, Popconfirm } from "antd";
import type { TableProps, PopconfirmProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "700"], // tùy chỉnh mức độ đậm bạn muốn dùng
});

interface DataType {
  key: string;
  id: string;
  categoryName: string;
  item: string;
  type: string;
}

const data: DataType[] = [
  {
    key: "1",
    id: "1",
    categoryName: "Food and drink",
    item: "/foodAndDrink.png",
    type: "Expense",
  },
  {
    key: "2",
    id: "2",
    categoryName: "Education",
    item: "/education.png",
    type: "Expense",
  },
  {
    key: "3",
    id: "3",
    categoryName: "Help family",
    item: "/helpFamily.png",
    type: "Goal",
  },
  {
    key: "4",
    id: "4",
    categoryName: "Reserve fund",
    item: "/reserveFund.png",
    type: "Goal",
  },
  {
    key: "5",
    id: "5",
    categoryName: "Salary",
    item: "/salary.png",
    type: "Income",
  },
  {
    key: "6",
    id: "6",
    categoryName: "Dating",
    item: "/dating.png",
    type: "Expense",
  },
  {
    key: "7",
    id: "7",
    categoryName: "Pet",
    item: "/pet.png",
    type: "Expense",
  },
];
export default function SignUpEmail() {
  const [tableData, setTableData] = useState<DataType[]>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategoryName, setCategoryName] = useState<DataType | null>(null);
  // hai popconfirm của delete và edit
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  // Hàm mở Modal khi click Edit:
  // record chính là dữ liệu của một hàng (row) trong bảng antd Table. Khi bạn click vào biểu tượng EditOutlined ở một dòng cụ thể, record sẽ chứa toàn bộ thông tin của dòng đó.
  const handleEdit = (record: DataType) => {
    setCategoryName(record);
    setIsModalOpen(true);
  };

  // hàm delete
  const handleDelete = (record: DataType) => {
    setTableData((prev) => prev.filter((item) => item.key !== record.key));
    message.success(`Deleted ${record.categoryName}`);
  };
  //hàm khi change status thì  nó sẽ set và đổ lại lên account status
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      align: "center",
      render: (src, record) => (
        <img
          src={src}
          alt={record.categoryName}
          style={{ width: 32, height: 32 }}
        />
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
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
              description="Are you sure to delete this account?"
              onConfirm={() => handleDelete(record)}
              onCancel={cancel}
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
    <div className={comfortaa.className} style={{ fontSize: 10 }}>
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
            }}
          >
            <Table
              className="custom-table-wrapper"
              columns={columns}
              dataSource={tableData}
            />
            ;
          </div>
          {/*modal khi click edit*/}
          <div>
            <Modal
              title={
                <span style={{ color: "black", fontWeight: "bold" }}>
                  Edit Account Status
                </span>
              }
              open={isModalOpen}
              onOk={() => setIsModalOpen(false)}
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
                <Button
                  key="update"
                  type="primary"
                  onClick={() => {
                    if (editCategoryName && selectedStatus) {
                      const updatedData = tableData.map((user) =>
                        user.key === editCategoryName.key
                          ? { ...user, status: selectedStatus }
                          : user
                      );
                      setTableData(updatedData);
                      setIsModalOpen(false);
                      setSelectedStatus(null);
                      // message.success(`Updated category name to ${selectedStatus} for ${editCategoryName
                      //     .fullName}`);
                    } else {
                      message.warning("Please select a status");
                    }
                  }}
                >
                  Update
                </Button>,
              ]}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <Checkbox
                  checked={selectedStatus === "Active"}
                  onChange={() => handleStatusChange("Active")}
                  style={{}}
                >
                  Active
                </Checkbox>
                <Checkbox
                  checked={selectedStatus === "Pending Verification"}
                  onChange={() => handleStatusChange("Pending Verification")}
                  style={{}}
                >
                  Pending Verification
                </Checkbox>
                <Checkbox
                  checked={selectedStatus === "Banned"}
                  onChange={() => handleStatusChange("Banned")}
                  style={{}}
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

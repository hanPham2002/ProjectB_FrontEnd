"use client";
// @flow
import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  Layout,
  Row,
  Select,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["700", "700"], // tùy chỉnh mức độ đậm bạn muốn dùng
});
const labelCol = {
  fontWeight: "bold",
  fontSize: 16,
  color: "#434647",
};

type FieldType = {
  newpassword?: string;
  confirm?: string;
};

const Page = () => {
  const [isEditing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const pathname = usePathname();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("🟢 Success:", values);
    // console.log("🟢 New password ready to send to backend:", values.newpassword);
    setEditing(false); // tắt chế độ chỉnh sửa sau khi lưu
    form.resetFields();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ width: "100%" }}>
      <Form
        form={form}
        name="profile"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: "50%" }}
      >
        <Form.Item
          name="newpassword"
          label={<span style={labelCol}>New password</span>}
          rules={[
            {
              required: true,
              message: "Please input new password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password style={{ height: 40, width: 400 }} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label={<span style={labelCol}>Confirm Password</span>}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password style={{ height: 40, width: 400 }} />
        </Form.Item>

        {/* Nút SAVE và CANCEL */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            marginTop: 20,
            marginLeft: 300,
          }}
        >
          <Button
            className={comfortaa.className}
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#0c2c52",
              borderRadius: 24,
              padding: "8px 36px",
              fontWeight: "bold",
              letterSpacing: 1,
              marginRight: "15px",
              boxShadow: "3px -1px 25px 2px rgba(0,0,0,0.17) inset",
            }}
          >
            SAVE
          </Button>

          <Button
            className={comfortaa.className}
            type="primary"
            htmlType="button"
            onClick={() => form.resetFields()}
            style={{
              backgroundColor: "#0c2c52",
              borderRadius: 24,
              padding: "8px 36px",
              fontWeight: "bold",
              letterSpacing: 1,
              marginRight: "500px", // ✅ vẫn giữ nguyên lề phải như bản gốc
              boxShadow: "3px -1px 25px 2px rgba(0,0,0,0.17) inset",
            }}
          >
            CANCEL
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Page;

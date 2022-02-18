import React from "react";
import Form, { useForm } from "@rhc/form";

const Page = () => {
  const form = useForm("form1");
  
  return (
    <div>
      <Form form={form}>
        <Form.Item name="name" label="姓名">
          <input />
        </Form.Item>
        <Form.Item name="age" label="年龄">
          <input />
        </Form.Item>
        <Form.Item name="gender" label="性别">
          <input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Page;

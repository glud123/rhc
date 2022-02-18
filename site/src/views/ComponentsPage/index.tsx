import React from "react";
import Form, { useForm } from "@rhc/form";

const Page = () => {
  const form = useForm("form");
  return (
    <div>
      <Form form={form}>
        <Form.Item name="name" label="姓名"></Form.Item>
        <Form.Item name="age" label="年龄"></Form.Item>
        <Form.Item name="gender" label="性别"></Form.Item>
      </Form>
    </div>
  );
};

export default Page;

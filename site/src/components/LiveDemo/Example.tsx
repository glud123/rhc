import React from "react";
import Form, { useForm } from "@rhc/form";
import Input from "@/components/Input";
import Button from "@/components/Button";

const Example = () => {
  const form = useForm("live-demo");
  return (
    <Form form={form}>
      <Form.Item name="name" label="姓名">
        <Input />
      </Form.Item>
      <Form.Item name="age" label="年龄">
        <Input />
      </Form.Item>
      <div>
        <Button type="primary">SUBMIT</Button>
      </div>
    </Form>
  );
};

export default Example;

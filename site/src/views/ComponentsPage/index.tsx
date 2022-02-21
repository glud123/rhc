import React, { FC, useState } from "react";
import Form, { useForm } from "@rhc/form";
import Input from "@/components/Input";
import Select from "@/components/Slecect";

const Page = () => {
  const form = useForm("demo");

  const [formData, setFormData] = useState<any>();

  const handleClick = () => {
    let value = form.get();
    setFormData({ ...value });
  };

  return (
    <div>
      <Form form={form}>
        <Form.Item name="name" label="姓名">
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item name="age" label="年龄">
          <Input type="number" placeholder="请输入年龄" />
        </Form.Item>
        <Form.Item name="address" label="地址">
          <Input placeholder="请输入地址" />
        </Form.Item>
        <Form.Item name="class" label="班级">
          <Select
            placeholder="请选择班级"
            options={[
              { label: "一班", value: "class1" },
              { label: "二班", value: "class2" },
              { label: "三班", value: "class3" },
            ]}
          />
        </Form.Item>
      </Form>
      <button type="button" onClick={handleClick}>
        取值
      </button>
      <div>{JSON.stringify(formData)}</div>
    </div>
  );
};

export default Page;

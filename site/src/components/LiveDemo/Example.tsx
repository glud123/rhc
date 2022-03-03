import React from "react";
import Form, { useForm } from "@rhc/form";
import { createUseStyles } from "react-jss";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Info from "@/components/Info";

const Example = () => {
  const form = useForm("live-demo");

  const styles = useStyles();

  const handleSubmit = () => {
    form.validate().then((err) => {
      if (err) {
      } else {
        let formValue = form.get();
        console.log(formValue);
      }
    });
  };

  const handleEdit = (edit: boolean) => {
    form.setState({ disabled: edit });
  };

  return (
    <div className={styles.example}>
      <Info>尝试对表单项进行操作，查看后续结果</Info>
      <Form form={form}>
        <Form.Item
          name="name"
          label="姓名"
          required
          rules={(value) => {
            if (value) {
              return Promise.resolve();
            } else {
              return Promise.reject(new Error("请输入姓名"));
            }
          }}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item name="age" label="年龄">
          <Input />
        </Form.Item>
        <Form.Item
          name="identity"
          label="身份"
          required
          rules={(value) => {
            console.log(value);
            if (value) {
              return Promise.resolve();
            } else {
              return Promise.reject(new Error("请选择身份"));
            }
          }}
        >
          <Select
            options={[
              {
                label: "学生",
                value: "student",
              },
              {
                label: "教师",
                value: "teacher",
              },
              {
                label: "职工",
                value: "worker",
              },
            ]}
          />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          submit
        </Button>
        <Button type="primary" onClick={() => handleEdit(false)}>
          edit
        </Button>
        <Button type="primary" onClick={() => handleEdit(true)}>
          disabled
        </Button>
      </Form>
    </div>
  );
};

export default Example;

const useStyles = createUseStyles({
  example: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
});

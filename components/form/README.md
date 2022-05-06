# @rhc/form

简单、易用、可扩展的表单组件。

[![Build And Deploy](https://github.com/glud123/rhc/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/glud123/rhc/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/glud123/rhc/branch/main/graph/badge.svg?token=DBDT3Q70YP)](https://codecov.io/gh/glud123/rhc)
[![npm version](https://badge.fury.io/js/@rhc%2Fform.svg)](https://badge.fury.io/js/@rhc%2Fform)
![npm](https://img.shields.io/npm/dw/@rhc/form)
### 简介

基于 React Hooks 的表单组件。 [了解更多](https://glud123.github.io/rhc/)

[Github](https://github.com/glud123/rhc/tree/main/components/form)

### 能力

- 结构化（视图即数据结构，满足复杂数据结构，支持表单项嵌套）
- 插件化（支持自定义表单项渲染容器和表单项校验渲染容器）
- 状态灵活（支持跨层级、跨组件、跨表单取值设值）
- 数据驱动（支持跨层级、跨组件监听表单某项变化，并触发当前组件渲染）
- 最小粒度渲染（提高在复杂表单场景下表单页面性能）
- 简单易用（提供简洁实用的 API，如：取值（`get`）、设值（`set`）、移除（`remove`）、重置表单（`reset`）、表单校验（`validate`） API 等）

### 安装

```shell
npm install @rhc/form
```

### 示例

```js
// example.tsx
import React from "react";
import Form, { useForm } from "@rhc/form";

const Example = () => {
  const form = useForm("live-demo");
  const handleSubmit = () => {
    form
      .validate()
      .then((value) => {
        let formValue = form.getValues();
        console.log("formValue", formValue);
      })
      .catch((err) => {
        console.log("formErr", err);
      });
  };
  return (
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
        <Input type="number" placeholder="请输入年龄" />
      </Form.Item>
      <button type="button" onClick={handleSubmit}>
        submit
      </button>
    </Form>
  );
};

export default Example;

interface InputProps {
  value?: string;
  onChange?: (v: string) => void;
  type?: "text" | "number";
  placeholder?: string;
  disabled?: boolean;
}
// Input 组件
const Input: FC<InputProps> = (props) => {
  const { value = "", onChange, type = "text", placeholder, disabled } = props;

  const handleChange = (e: { target: { value: string } }) => {
    onChange && onChange(e.target.value);
  };

  return (
    <input
      disabled={disabled}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};
```

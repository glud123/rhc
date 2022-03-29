import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import ListMenu from "@/components/ListMenu";
import * as Pages from "./pages";

const MenuList = [
  {
    label: "useForm",
    path: "useForm",
    isHash: true,
  },
  {
    label: "Form",
    path: "form",
    isHash: true,
  },
  {
    label: "Form.Item",
    path: "item",
    isHash: true,
  },
  {
    label: "Form.List",
    path: "list",
    isHash: true,
  },
];

const APIsPage = () => {
  const { component } = useParams();

  let Component = component ? (Pages as any)[component] : Pages.form;

  return (
    <ListMenu options={MenuList} position="right">
      <Component />
    </ListMenu>
  );
};

export default APIsPage;

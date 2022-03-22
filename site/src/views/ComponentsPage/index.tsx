import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import ListMenu from "@/components/ListMenu";
import * as Pages from "./pages";

const MenuList = [
  {
    label: "Form",
    path: "form",
  },
];

const ComponentsPage = () => {
  const { component } = useParams();

  let Component = component ? (Pages as any)[component] : Pages.form;

  return (
    <ListMenu options={MenuList}>
      <Component />
    </ListMenu>
  );
};

export default ComponentsPage;

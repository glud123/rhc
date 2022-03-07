import React, { useState } from "react";
import Form, { useForm } from "@rhc/form";

const Demo = () => {
  const form = useForm("demo");

  // form.subscribe({ fieldsName: ["name"] });

  let values = form.getValues(["address", "name", "age"]);

  console.log("render Demo!", values);

  return (
    <div>
      <div>Form Name Value is: {values.name}</div>
      <div>Form Age Value is: {values.age}</div>
    </div>
  );
};

export default Demo;

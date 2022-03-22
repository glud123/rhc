import React, { FC, useEffect } from "react";
import Form, { useForm } from "@rhc/form";
import ItemWithSwitch from "@/components/ItemWithSwitch";
import Input from "@/components/Input";

const Outside = () => {
  const form = useForm("subscriptions_outside");

  useEffect(() => {
    form.setDefaultValue({
      watching: "watching for outside",
    });
    form.resetValues();
  }, []);

  return (
    <div>
      <Form form={form}>
        <Form.Item name="watching">
          <Input />
        </Form.Item>
      </Form>
      <ItemWithSwitch style={{ marginBottom: "20px" }} defaultValue={true}>
        <Item />
      </ItemWithSwitch>
      <ItemWithSwitch style={{ marginBottom: "20px" }}>
        <Item />
      </ItemWithSwitch>
      <ItemWithSwitch style={{ marginBottom: "20px" }} defaultValue={true}>
        <Item />
      </ItemWithSwitch>
      <ItemWithSwitch style={{ marginBottom: "20px" }}>
        <Item />
      </ItemWithSwitch>
    </div>
  );
};

export default Outside;

interface ItemProps {
  isSubscribe?: boolean;
}

const Item: FC<ItemProps> = (props) => {
  const { isSubscribe } = props;
  const form = useForm("subscriptions_outside");
  const fieldName = ["watching"];
  const fieldValue = isSubscribe ? form.getValues(fieldName) : "";
  form.subscribe({ fieldsName: isSubscribe ? fieldName : [] }, [isSubscribe]);

  return <span>{fieldValue}</span>;
};

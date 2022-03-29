import React, { FC, useEffect } from "react";
import Form, { useForm } from "@rhc/form";
import ItemWithSwitch from "@/components/ItemWithSwitch";
import Input from "@/components/Input";

const Inside = () => {
  const form = useForm("subscriptions_inside");

  useEffect(() => {
    form.setDefaultValue({
      watching: "watching for inside",
    });
    form.resetValues();
  }, []);

  return (
    <div>
      <Form form={form}>
        <Form.Item name="watching">
          <Input />
        </Form.Item>
        <Form.Item name="field_1">
          <ItemWithSwitch defaultValue={true}>
            <Item />
          </ItemWithSwitch>
        </Form.Item>
        <Form.Item name="field_2">
          <ItemWithSwitch>
            <Item />
          </ItemWithSwitch>
        </Form.Item>
        <Form.Item name="field_3">
          <ItemWithSwitch defaultValue={true}>
            <Item />
          </ItemWithSwitch>
        </Form.Item>
        <Form.Item name="field_3">
          <ItemWithSwitch>
            <Item />
          </ItemWithSwitch>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Inside;

interface ItemProps {
  isSubscribe?: boolean;
}

const Item: FC<ItemProps> = (props) => {
  const { isSubscribe } = props;
  const form = useForm("subscriptions_inside");
  const fieldName = ["watching"];
  const fieldValue = isSubscribe ? form.getValues(fieldName) : "";
  form.subscribe({ fieldsName: isSubscribe ? fieldName : [] }, [isSubscribe]);

  return <span>{fieldValue}</span>;
};

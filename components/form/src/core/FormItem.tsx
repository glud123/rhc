import React, { FC, useContext } from "react";
import { FormContext, ItemContext } from "./context";
import {
  FieldNamePath,
  WrapperItemType,
  WrapperValidationType,
} from "../types";

export interface FormItemPropsInterface {
  name: FieldNamePath;
  label?: string | React.ReactNode;
  required?: boolean;
  dependencies?: FieldNamePath[];
  wrapperItem?: WrapperItemType;
  wrapperValidation?: WrapperValidationType;
  rules?: (value: any, allValues: any) => Promise<any>;
  [k: string]: any;
}

const FormItem: FC<FormItemPropsInterface> = (props) => {
  const {
    name,
    dependencies = [],
    children,
    wrapperItem,
    wrapperValidation,
    ...rest
  } = props;

  const { formStore } = useContext(FormContext);

  if (!formStore.form) {
    return null;
  }

  const { form, wrapper } = formStore;

  let currentName = form.getFieldName().concat(name);

  form.subscribe({ fieldsName: [currentName, ...dependencies] }, [], "form");

  let formState = form.subscribeState();

  let currentValue = form.getValues(currentName);

  const handleChange = (v: any) => {
    form.setValues({ fieldName: currentName, value: v });
  };

  let nextChildren = React.createElement(
    (wrapperItem ? wrapperItem : wrapper.wrapperItem) as any,
    {
      label: rest.label,
      required: rest.required,
    },
    <Item
      form={form}
      disabled={formState.disabled}
      value={currentValue}
      onChange={handleChange}
    >
      {children}
    </Item>
  );

  return (
    <ItemContext.Provider value={{ __parent: currentName }}>
      {React.createElement(
        (wrapperValidation
          ? wrapperValidation
          : wrapper.wrapperValidation) as any,
        {
          form,
          disabled: formState.disabled,
          ...rest,
        },
        nextChildren
      )}
    </ItemContext.Provider>
  );
};

export default FormItem;

export type FormItemType = typeof FormItem;

interface ItemProps {
  [k: string]: any;
}

const Item: FC<ItemProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <div className="form-item-content" style={{ width: "100%" }}>
      {React.cloneElement(children as React.ReactElement, rest)}
    </div>
  );
};

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
    label,
    required,
    dependencies = [],
    children,
    wrapperItem,
    wrapperValidation,
    rules,
    ...rest
  } = props;

  const { formStore } = useContext(FormContext);

  if (!formStore.form) {
    return null;
  }

  const { form, wrapper } = formStore;

  let currentName = form.getFieldName().concat(name);

  form.subscribe({ fieldsName: [currentName, ...dependencies] }, [], true);

  let formState = form.subscribeState();

  let currentValue = form.getValues(currentName);

  const handleChange = (v: any) => {
    form.setValues({ fieldName: currentName, value: v });
  };

  let nextChildren = children;

  if (!(children && typeof (children as any).type === "string")) {
    if (rules && rules.length > 0) {
      nextChildren = React.createElement(
        (wrapperValidation
          ? wrapperValidation
          : wrapper.wrapperValidation) as any,
        {
          form: form,
          name: name,
          disabled: formState.disabled,
          rules: rules,
          value: currentValue,
          onChange: handleChange,
        },
        children
      );
    } else {
      nextChildren = React.cloneElement(children as React.ReactElement, {
        disabled: formState.disabled,
        value: currentValue,
        onChange: handleChange,
      });
    }
  }

  return (
    <ItemContext.Provider value={{ __parent: currentName }}>
      {React.createElement(
        (wrapperItem ? wrapperItem : wrapper.wrapperItem) as any,
        {
          form: form,
          name,
          label,
          required,
          ...rest,
        },
        nextChildren
      )}
    </ItemContext.Provider>
  );
};

export default FormItem;

export type FormItemType = typeof FormItem;

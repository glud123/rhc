import React, { FC, useContext } from "react";
import { FormContext, ItemContext } from "./context";
import type {
  NamePath,
  NamePathType,
  WrapperItemType,
  WrapperValidationType,
} from "../types";

export interface FormItemPropsInterface {
  name: NamePathType;
  label?: string | React.ReactNode;
  required?: boolean;
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

  const { form, wrapper, state } = formStore;

  let currentName = [...(form.item.getName() as NamePath), name] as NamePath;

  form.subscribe({ paths: [currentName] });

  const handleChange = (v: any) => {
    let key = form.item.convertName(currentName) as string;
    form.set({ [key]: v });
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
          disabled: !state.isEdit,
          rules: rules,
          value: form.get(currentName),
          onChange: handleChange,
        },
        children
      );
    } else {
      nextChildren = React.cloneElement(children as React.ReactElement, {
        disabled: !state.isEdit,
        value: form.get(currentName),
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

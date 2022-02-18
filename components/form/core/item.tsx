import React, { FC, useContext } from "react";
import { FormContext, ItemContext } from "./context";
import type { NamePath, NamePathType, Validation } from "../types";

export interface ItemPropsInterface {
  name: NamePathType;
  label?: string | React.ReactNode;
  required?: boolean;
  verifier?: React.ReactNode;
  rules?: (value: any, allValues: any) => Promise<any>;
  [k: string]: any;
}

const Item: FC<ItemPropsInterface> = (props) => {
  const { name, label, required, children, verifier, rules, ...rest } = props;

  const { store } = useContext(FormContext);

  if (!store.form) {
    return null;
  }

  const { form, options, state } = store;

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
        (verifier ? (verifier as Validation) : options.verifier) as any,
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
        options.itemLayout as any,
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

export default Item;

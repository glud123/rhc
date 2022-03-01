import React, { FC, useContext } from "react";
import { FormContext, ItemContext } from "./context";
import { NamePath, NamePathType } from "../types";

interface FormListPropsInterface {
  name: NamePathType;
}

const FormList: FC<FormListPropsInterface> = (props) => {
  const { name, children } = props;

  const { formStore } = useContext(FormContext);

  const { form } = formStore;

  let currentName = (form.item.getName() as NamePath).concat(
    form.item.convertName(name)
  );

  form.subscribe({ paths: [currentName] });

  const values = form.get(currentName);

  return (
    <ItemContext.Provider value={{ __parent: currentName }}>
      {(values || []).map((_item: any, index: number) => {
        return (
          <FormListItem key={index} name={index}>
            {children}
          </FormListItem>
        );
      })}
    </ItemContext.Provider>
  );
};

export default FormList;

export type FormListType = typeof FormList;

interface FormListItemPropsInterface {
  name: number;
}

const FormListItem: FC<FormListItemPropsInterface> = (props) => {
  const { name, children } = props;

  const { formStore } = useContext(FormContext);

  const { form } = formStore;

  let currentName = (form.item.getName() as NamePath).concat(
    form.item.convertName(name)
  );

  form.subscribe({ paths: [currentName] });

  return (
    <ItemContext.Provider value={{ __parent: currentName }}>
      {children}
    </ItemContext.Provider>
  );
};

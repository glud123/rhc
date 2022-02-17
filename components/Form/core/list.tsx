import React, { FC, useContext } from "react";
import { FormContext, ItemContext } from "./context";
import { NamePath, NamePathType } from "../types";

interface FormListPropsInterface {
  name: NamePathType;
}

const List: FC<FormListPropsInterface> = (props) => {
  const { name, children } = props;

  const { store } = useContext(FormContext);

  const { form } = store;

  let currentName = (form.item.getName() as NamePath).concat(
    form.item.convertName(name)
  );

  form.subscribe({ paths: [currentName] });

  const values = form.get(currentName);

  return (
    <ItemContext.Provider value={{ __parent: currentName }}>
      {(values || []).map((_item: any, index: number) => {
        return (
          <ListItem key={index} name={index}>
            {children}
          </ListItem>
        );
      })}
    </ItemContext.Provider>
  );
};

export default List;

interface ListItemPropsInterface {
  name: number;
}

const ListItem: FC<ListItemPropsInterface> = (props) => {
  const { name, children } = props;

  const { store } = useContext(FormContext);

  const { form } = store;

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

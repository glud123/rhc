import React, { FC, useCallback, useEffect, useState, useReducer } from "react";
import { FormContext, formReducer } from "./context";
import Validation from "../Validation";
import ItemLayout from "../ItemLayout";
import { FormType, FormActionEnum } from "../types";

export interface CorePropsInterface {
  // 表单数据操作方法集合
  form: FormType;
  // 表单是否是编辑态
  isEdit?: boolean;
  // 表单项校验组件
  verifier?: React.ReactNode;
  // 表单初始值
  initialValues?: any;
  // 表单值
  value?: any;
  // 表单项容器组件
  itemLayout?: React.ReactNode;
}

const FormCore: FC<CorePropsInterface> = (props) => {
  const {
    form,
    isEdit = true,
    verifier = Validation,
    itemLayout = ItemLayout,
    initialValues = {},
    value,
    children,
  } = props;

  const [store, dispatch] = useReducer(formReducer, {
    form,
    options: {
      verifier,
      itemLayout,
    },
    state: {
      isEdit,
    },
  });

  const listener = useCallback((_, state) => {
    if (state === "update") {
      dispatch({
        type: FormActionEnum.Update,
        data: null,
      });
    }
  }, []);

  form.subscribe({
    listener,
  });

  useEffect(() => {
    if (value) {
      form.set(value);
    }
  }, [value]);

  useEffect(() => {
    dispatch({
      type: FormActionEnum.State,
      data: { isEdit },
    });
    dispatch({
      type: FormActionEnum.Options,
      data: {
        verifier,
        itemLayout,
      },
    });
  }, [isEdit, verifier, itemLayout]);

  useEffect(() => {
    const formValue = form.get();
    if (
      Object.keys(formValue).length === 0 &&
      Object.keys(initialValues).length > 0
    ) {
      form.setInitialValue(initialValues);
      form.reset();
    }
  }, []);

  return (
    <FormContext.Provider value={{ store, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormCore;

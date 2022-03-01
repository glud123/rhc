import React, { FC, useCallback, useEffect, useReducer } from "react";
import { FormContext, formReducer } from "./context";
import WrapperValidation from "../wrapper/Validation";
import WrapperItem from "../wrapper/Item";
import {
  FormInstanceType,
  FormActionEnum,
  WrapperItemType,
  WrapperValidationType,
} from "../types";

export interface FormCorePropsInterface {
  // 表单数据操作方法集合
  form: FormInstanceType;
  // 表单是否是编辑态
  isEdit?: boolean;
  // 表单项校验组件
  wrapperValidation?: WrapperValidationType;
  // 表单初始值
  initialValues?: any;
  // 表单值
  value?: any;
  // 表单项容器组件
  wrapperItem?: WrapperItemType;
}

const FormCore: FC<FormCorePropsInterface> = (props) => {
  const {
    form,
    isEdit = true,
    wrapperItem = WrapperItem,
    wrapperValidation = WrapperValidation,
    initialValues = {},
    value,
    children,
  } = props;

  const [formStore, dispatch] = useReducer(formReducer, {
    form,
    wrapper: {
      wrapperItem,
      wrapperValidation,
    },
    state: {
      isEdit,
    },
    store: {},
  });

  const listener = useCallback((_, state) => {
    if (state === "update") {
      dispatch({
        type: FormActionEnum.Update,
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
      type: FormActionEnum.Wrapper,
      data: {
        wrapperItem,
        wrapperValidation,
      },
    });
  }, [isEdit, wrapperItem, wrapperValidation]);

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
    <FormContext.Provider value={{ formStore, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormCore;

export type FormCoreType = typeof FormCore;

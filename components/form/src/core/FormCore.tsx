import React, { FC, useEffect, useReducer } from "react";
import { FormContext, formReducer } from "./context";
import WrapperValidation from "../wrapper/Validation";
import WrapperItem from "../wrapper/Item";
import {
  FormInstanceType,
  FormActionEnum,
  WrapperItemType,
  WrapperValidationType,
} from "../types";

interface FormCorePropsInterface {
  // 表单数据操作方法集合
  form: FormInstanceType;
  // 表单项容器组件
  wrapperItem?: WrapperItemType;
  // 表单项校验组件
  wrapperValidation?: WrapperValidationType;
}

const FormCore: FC<FormCorePropsInterface> = (props) => {
  const {
    form,
    wrapperItem = WrapperItem,
    wrapperValidation = WrapperValidation,
    children,
  } = props;

  const [formStore, dispatch] = useReducer(formReducer, {
    form,
    wrapper: {
      wrapperItem,
      wrapperValidation,
    },
  });

  form.subscribe(
    {
      listener: (value, fieldName, allValue, state) => {
        state === "update" &&
          dispatch({
            type: FormActionEnum.Update,
          });
      },
    },
    [],
    "form"
  );

  useEffect(() => {
    dispatch({
      type: FormActionEnum.Wrapper,
      data: {
        wrapperItem,
        wrapperValidation,
      },
    });
  }, [wrapperItem, wrapperValidation]);

  return (
    <FormContext.Provider value={{ formStore, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormCore;

export type FormCoreType = typeof FormCore;

import React from "react";
import { FormActionEnum } from "../types";
import type {
  FormContextType,
  FormInstanceType,
  FormReducerInterface,
  WrapperType,
} from "../types";

/**
 * 表单上下文
 */
export const FormContext = React.createContext<FormContextType>({
  formStore: {
    state: {
      isEdit: true,
    },
  },
  dispatch: () => {},
} as any);

/**
 * 表单项上下文
 */
export const ItemContext = React.createContext({} as any);

/**
 * 表单 reducer 方法
 */
export const formReducer: FormReducerInterface = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case FormActionEnum.Form:
      return { ...state, form: data as FormInstanceType };
    case FormActionEnum.State:
      return { ...state, state: { ...state["state"], ...data } };
    case FormActionEnum.Update:
      return { ...state };
    case FormActionEnum.Wrapper:
      return { ...state, wrapper: data as WrapperType };
    default:
      return { ...state, store: { ...state["store"], ...data } };
  }
};

type __FORM_STORE__type = {
  _state: { [k: string]: any };
  _listeners: { [k: string]: any };
  _listeners4Validate: { [k: string]: any };
};

interface createFormStoreInterface {
  (): {
    formsState: {
      get: (formName: string) => { [k: string]: any };
      set: (formName: string, nextState: any) => void;
    };
    formsListeners: {
      get: (formName: string) => { [k: string]: any };
      set: (formName: string, nextListeners: any) => void;
    };
    formsListeners4Validate: {
      get: (formName: string) => { [k: string]: any };
      set: (formName: string, nextListeners4Validate: any) => void;
    };
    formsDestroy: (formName: string) => void;
  };
}

/**
 * 表单数据仓库
 * 其中包含所有表单的状态（_state）、监听器（_listeners）、验证监听器（_listeners4Validate）
 */

let __FORM_STORE__: __FORM_STORE__type = {
  _state: {},
  _listeners: {},
  _listeners4Validate: {},
};

/**
 * 创建表单数据仓库
 * 数据类型划分为状态（_state）、监听器（_listeners）、验证监听器（_listeners4Validate）
 * 针对每一种类型的状态都提供出 get 和 set 方法，用于获取和设置对应类型数据
 * 同时，提供 destroy 方法，用于销毁所有数据类型下某个表单的数据
 *
 * @example
 * // 示例: 
 * // 对表单 'form1' 的状态（_state）、监听器（_listeners）、验证监听器（_listeners4Validate）进行取值设值
 * const {formsState, formsListeners, formsListeners4Validate, formsDestroy} = createFormStore();
 * // 获取表单 'form1' 的状态
 * const state = formsState.get('form1');
 * // form1 的 state ==> {}
 * formsState.set('form1', {a: 1});
 * // form1 的 state ==> {a: 1}
 * const listeners = formsListeners.get('form1');
 * // form1 的 listeners ==> {}
 * formsListeners.set('form1', {a: 2});
 * // form1 的 listeners ==> {a: 2}
 * formsDestroy('form1');
 * // form1 的 state ==> {}
 * // form1 的 listeners ==> {}
 * 
 */
export const createFormStore: createFormStoreInterface = () => {
  const get = (key: keyof __FORM_STORE__type, formName: string) => {
    const preState = __FORM_STORE__[key][formName];
    if (typeof preState === "undefined") {
      __FORM_STORE__[key][formName] = {};
    }
    return __FORM_STORE__[key][formName];
  };

  const set = (
    key: keyof __FORM_STORE__type,
    formName: string,
    nextState: any
  ) => {
    const preState = __FORM_STORE__[key][formName];
    if (typeof nextState === "undefined") {
      __FORM_STORE__[key][formName] = {};
    } else {
      __FORM_STORE__[key][formName] = { ...preState, ...nextState };
    }
  };

  const destroy = (formName: string) => {
    Object.keys(__FORM_STORE__).forEach((key) => {
      __FORM_STORE__[key as keyof __FORM_STORE__type][formName] = {};
    });
  };

  return {
    formsState: {
      get: (formName) => get("_state", formName),
      set: (formName, nextState) => set("_state", formName, nextState),
    },
    formsListeners: {
      get: (formName) => get("_listeners", formName),
      set: (formName, nextListeners) =>
        set("_listeners", formName, nextListeners),
    },
    formsListeners4Validate: {
      get: (formName) => get("_listeners4Validate", formName),
      set: (formName, nextListeners4Validate) =>
        set("_listeners4Validate", formName, nextListeners4Validate),
    },
    formsDestroy: destroy,
  };
};

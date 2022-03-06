import React from "react";
import { FormActionEnum } from "../types";
import type {
  FormContextType,
  FormInstanceType,
  FormReducerInterface,
  WrapperType,
  CreateFormStoreInterface,
} from "../types";

/**
 * 表单上下文
 */
export const FormContext = React.createContext<FormContextType>({
  formStore: {},
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
    case FormActionEnum.Update:
      return { ...state };
    case FormActionEnum.Wrapper:
      return { ...state, wrapper: data as WrapperType };
    default:
      return { ...state };
  }
};

type __FORM_STORE__type = {
  // 表单字段数据集合
  _state: { [k: string]: any };
  // 表单字段监听器集合
  _listeners: { [k: string]: any };
  // 表单字段校验监听器集合
  _listeners4Validate: { [k: string]: any };
  // 表单状态集合
  _state4Form: { [k: string]: any };
  // 表单字状态监听器集合
  _listeners4FormState: { [k: string]: any };
  // 表单提供的数据仓库集合
  _store: { [k: string]: any };
  // 表单提供的数据仓库监听器集合
  _listeners4Store: { [k: string]: any };
};

/**
 * 表单数据仓库
 *
 * 表单字段相关数据：
 * - 表单的字段状态( _state )
 * - 表单的字段状态监听器( _listeners )
 * - 表单的字段验证监听器( _listeners4Validate )
 *
 * 表单基础状态先关数据：
 * - 表单基础状态( _state4Form )
 * - 表单基础状态监听器( _listeners4FormState )
 *
 * 表单提供的数据仓库：
 * - 表单提供的数据仓库( _store )
 * - 表单提供的数据仓库监听器( _listeners4Store )
 */

let __FORM_STORE__: __FORM_STORE__type = {
  _state: {},
  _listeners: {},
  _listeners4Validate: {},
  _state4Form: {},
  _listeners4FormState: {},
  _store: {},
  _listeners4Store: {},
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
export const createFormStore: CreateFormStoreInterface = () => {
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
    formsState4Form: {
      get: (formName) => get("_state4Form", formName),
      set: (formName, nextListeners) =>
        set("_state4Form", formName, nextListeners),
    },
    formsListeners4FormState: {
      get: (formName) => get("_listeners4FormState", formName),
      set: (formName, nextListeners) =>
        set("_listeners4FormState", formName, nextListeners),
    },
    formsStore: {
      get: (formName) => get("_store", formName),
      set: (formName, nextListeners) => set("_store", formName, nextListeners),
    },
    formsListeners4Store: {
      get: (formName) => get("_listeners4Store", formName),
      set: (formName, nextListeners) =>
        set("_listeners4Store", formName, nextListeners),
    },
    formsDestroy: destroy,
  };
};

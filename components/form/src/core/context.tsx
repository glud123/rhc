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
  store: {},
  dispatch: () => {},
} as any);

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

export const ItemContext = React.createContext({} as any);

let __FORM_STORE__: any;

const createFormStore = () => {
  if (__FORM_STORE__) {
    return __FORM_STORE__;
  }
  __FORM_STORE__ = {
    state: {},
    listeners: {},
    listeners4Validate: {},
  };
  return __FORM_STORE__;
};

interface useStoreInterface {
  (): {
    state: {
      get: () => any;
      set: (nextState: any) => void;
    };
    listeners: {
      get: () => any;
      set: (nextListeners: any) => void;
    };
    listeners4Validate: {
      get: () => any;
      set: (nextListeners4Validate: any) => void;
    };
    destroy: (name: string) => void;
  };
}

export const useFormStore: useStoreInterface = () => {
  const store = createFormStore();

  const get = (key: string) => {
    return store[key];
  };

  const set = (key: string, nextState: any) => {
    __FORM_STORE__[key] = { ...store[key], ...nextState };
  };

  const destroy = (name: string) => {
    Object.keys(__FORM_STORE__).forEach((key) => {
      __FORM_STORE__[key][name] = {};
    });
  };

  return {
    state: {
      get: () => get("state"),
      set: (nextState: any) => set("state", nextState),
    },
    listeners: {
      get: () => get("listeners"),
      set: (nextListeners: any) => set("listeners", nextListeners),
    },
    listeners4Validate: {
      get: () => get("listeners4Validate"),
      set: (nextListeners4Validate: any) =>
        set("listeners4Validate", nextListeners4Validate),
    },
    destroy,
  };
};

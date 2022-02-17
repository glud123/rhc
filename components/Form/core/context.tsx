import React from "react";
import type { FormContextStoreType, FormReducerInterface } from "../types";

export const FormContext = React.createContext<FormContextStoreType>({
  store: {},
  dispatch: () => {},
} as any);

/**
 * 表单 reducer 方法
 */
export const formReducer: FormReducerInterface = (state, action) => {
  const { type, data } = action;
  if (type === "update") {
    return { ...state };
  }
  if (type === "form") {
    return { ...state, form: data as any };
  }
  return { ...state, [type]: { ...state[type], ...data } };
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

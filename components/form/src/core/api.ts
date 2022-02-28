import { useEffect, useReducer, useContext } from "react";
import { FormContext, ItemContext, useFormStore } from "./context";

import {
  FormActionEnum,
  UseFormInterface,
  ContextType,
  NamePathType,
  GetInterface,
  SetInterface,
  RemoveInterface,
  ResetInterface,
  SubscribeInterface,
  ValidateInterface,
  CreateType,
  SubscribeValidateInterface,
  GetNameInterface,
  ConvertNameInterface,
  NamePath,
  useFormContextInterface,
  FormStateType,
} from "../types";

const create: () => CreateType = () => {
  let initialContext: ContextType = {};

  const { state, listeners, listeners4Validate, destroy } = useFormStore();

  const KEY = Symbol("form");

  const useForm: UseFormInterface = (name) => {
    let currentState = state.get();

    if (!currentState[name]) {
      state.set({ [name]: {} });
      listeners.set({
        [name]: {
          [KEY]: new Set(),
        },
      });
      listeners4Validate.set({
        [name]: {},
      });
    }
    // 取值
    const get: GetInterface = (path) => {
      let currentState = state.get();
      if (Array.isArray(path)) {
        let fieldValue = path.reduce((prev = {}, cur, index) => {
          return prev[cur];
        }, currentState[name]);
        return fieldValue;
      } else {
        return currentState[name];
      }
    };
    // 设值
    const set: SetInterface = (nextFieldsValue) => {
      let currentState = state.get();
      let currentListeners = listeners.get();

      Object.keys(nextFieldsValue).forEach((fieldNamePath) => {
        let namePath = convertName(fieldNamePath) as NamePath;
        let nextValue = nextFieldsValue[fieldNamePath];
        let lastIndex = namePath.length - 1;
        namePath.reduce((prev, cur, index) => {
          if (index === lastIndex) {
            if (
              Object.prototype.toString.call(nextValue) === "[object Object]"
            ) {
              prev[cur] = {
                ...prev[cur],
                ...nextValue,
              };
            } else {
              prev[cur] = nextValue;
            }
          }
          if (!prev[cur] && index !== lastIndex) {
            prev[cur] = {};
          }
          return prev[cur];
        }, currentState[name]);
        let stringifyPath = convertName(namePath) as string;
        // 订阅了当前修改字段的变化，通知其更新
        if (currentListeners[name][stringifyPath]) {
          currentListeners[name][stringifyPath].forEach(
            (listener: (values: any, fieldValue: any) => void) =>
              listener(currentState[name], get(namePath))
          );
        }
      });
      // 如果订阅了表单变化，通知其更新 注：如果即订阅了表单又订阅了当前表单中字段变化会造成二次渲染
      if (currentListeners[name][KEY] && currentListeners[name][KEY].size > 0) {
        currentListeners[name][KEY].forEach((listener: (values: any) => void) =>
          listener(currentState[name])
        );
      }
    };
    // 移除
    const remove: RemoveInterface = (path) => {
      let currentState = state.get();
      let currentListeners = listeners.get();

      if (Array.isArray(path)) {
        let nextNamePath = [...path];
        let currentName = nextNamePath.pop();
        if (nextNamePath.length > 0) {
          let parentValue = get(nextNamePath);
          if (!parentValue) {
            return Promise.resolve();
          }
          if (
            Object.prototype.toString.call(parentValue) === "[object Object]"
          ) {
            if (parentValue[currentName as string]) {
              delete parentValue[currentName as string];
            } else {
              return Promise.resolve();
            }
          }
          if (Array.isArray(parentValue)) {
            parentValue.splice(currentName as number, 1);
          }
          // 通知当前字段父级变化
          let patentNamePath = convertName(nextNamePath) as string;
          if (
            currentListeners[name][patentNamePath] &&
            currentListeners[name][patentNamePath].size > 0
          ) {
            currentListeners[name][patentNamePath].forEach(
              (listener: (values: any) => void) => listener(currentState[name])
            );
          }
        } else {
          if (currentState[name][currentName as string]) {
            delete currentState[name][currentName as string];
            // 通知当前字段所在表单变化
            if (
              currentListeners[name][KEY] &&
              currentListeners[name][KEY].size > 0
            ) {
              currentListeners[name][KEY].forEach(
                (listener: (values: any, state?: "update") => void) =>
                  listener(currentState[name], "update")
              );
            }
          }
        }
      } else {
        currentState[name] = {};
        // 通知当前字段父级变化
        if (
          currentListeners[name][KEY] &&
          currentListeners[name][KEY].size > 0
        ) {
          currentListeners[name][KEY].forEach(
            (listener: (values: any) => void) => listener(currentState[name])
          );
        }
      }
      return Promise.resolve();
    };
    // 设置初始值
    const setInitialValue: SetInterface = (initialValue) => {
      initialContext[name] = JSON.stringify(initialValue);
    };
    // 重置
    const reset: ResetInterface = () => {
      if (initialContext[name]) {
        try {
          set(JSON.parse(initialContext[name]));
        } catch (error) {
          throw new Error(error as string);
        }
      } else {
        set({});
      }
    };
    // 订阅 => 取消订阅
    const subscribe: SubscribeInterface = (options = {}) => {
      const [, forceUpdate] = useReducer((c) => c + 1, 0) as [
        never,
        () => void
      ];

      const { paths, listener } = options;

      let nextListener = listener ? listener : forceUpdate;

      useEffect(() => {
        let currentListeners = listeners.get();
        let unsubscribe: () => void;

        if (Array.isArray(paths)) {
          paths.forEach((path) => {
            let namePath = convertName(path) as string;
            if (!currentListeners[name][namePath]) {
              currentListeners[name][namePath] = new Set();
            }
            currentListeners[name][namePath].add(nextListener);
          });
          unsubscribe = () => {
            paths.forEach((path) => {
              let namePath = convertName(path) as string;
              if (
                currentListeners[name] &&
                currentListeners[name][namePath] &&
                currentListeners[name][namePath].size > 0
              ) {
                currentListeners[name][namePath].delete(nextListener);
              } else {
                // 如果当前字段没有订阅者，则移除当前字段
                destroy(name);
              }
            });
          };
        } else {
          if (currentListeners[name][KEY]) {
            currentListeners[name][KEY].add(nextListener);
          } else {
            currentListeners[name][KEY] = new Set();
            currentListeners[name][KEY].add(nextListener);
          }

          unsubscribe = () => {
            if (currentListeners[name] && currentListeners[name][KEY]) {
              currentListeners[name][KEY].delete(nextListener);
            }
            destroy(name);
          };
        }
        return unsubscribe;
      }, []);
    };
    // 触发表单校验
    const validate: ValidateInterface = (paths) => {
      let currentState = state.get();
      let currentListeners4Validate = listeners4Validate.get();

      if (Array.isArray(paths)) {
        let nextListener = paths
          .map((path) => convertName(path) as string)
          .filter((path) => !!currentListeners4Validate[name][path])
          .map((path) => {
            return currentListeners4Validate[name][path](
              get(convertName(path) as NamePath),
              currentState[name]
            );
          });
        return Promise.allSettled(nextListener).then((results) => {
          let rejecteds = results
            .filter((result) => result.status === "rejected")
            .map((result: any) => result.reason);
          if (rejecteds.length > 0) {
            return Promise.reject(rejecteds);
          } else {
            return Promise.resolve();
          }
        });
      } else {
        let allListeners = Object.keys(currentListeners4Validate[name]).map(
          (path) => convertName(path) as NamePath
        );
        return validate(allListeners);
      }
    };
    /**
     * 订阅字段校验 => 取消订阅字段校验 （表单字段进行校验时触发）
     * @param options
     */
    const subscribeValidate: SubscribeValidateInterface = (options) => {
      const { paths, listener } = options;

      return useEffect(() => {
        let currentListeners4Validate = listeners4Validate.get();
        let unsubscribe: () => void = () => {};

        if (Array.isArray(paths)) {
          paths.forEach((path) => {
            let stringifyPath = convertName(path) as string;
            currentListeners4Validate[name][stringifyPath] = listener;
          });

          unsubscribe = () => {
            if (currentListeners4Validate[name]) {
              paths.forEach((path) => {
                let stringifyPath = convertName(path) as string;
                delete currentListeners4Validate[name][stringifyPath];
              });
            }
          };
        }

        return unsubscribe;
      }, []);
    };
    return {
      name: name,
      set,
      get,
      remove,
      reset,
      setInitialValue,
      subscribe,
      subscribeValidate,
      validate,
      item: {
        getName,
        convertName,
      },
    };
  };

  // 表单上下文hooks
  const useFormContext: useFormContextInterface = () => {
    const { store, dispatch } = useContext(FormContext);
    const dispatchState = (state: FormStateType) => {
      dispatch({
        type: FormActionEnum.State,
        data: state,
      });
    };
    return [store.state, dispatchState];
  };

  return { useForm, useFormContext };
};

export default create;

// 表单项工具方法
/**
 * 获取表单项的设置路径标识
 * @param path 基于当前项的路径向前偏移的标识
 * @param type {"string"|"array"} 返回的路径标识是以字符串的形式还是数组形式（默认数组）
 * @returns string | (string | number)[]
 *
 * @example
 * // 获取当前项路径
 * let currentItemName = getName();
 * // or
 * let currentItemName = getName(0);
 *
 * // 获取当前项的父级路径
 * let currentItemName = getName(1);
 */
const getName: GetNameInterface = (pathOffset = 0, type = "array") => {
  const itemContext = useContext(ItemContext);

  let namePath: NamePathType = [];
  if (itemContext && (itemContext as any).__parent) {
    namePath = [...(itemContext as any).__parent];
  }

  namePath = namePath.splice(0, namePath.length - pathOffset);

  if (type === "string") {
    return JSON.stringify(namePath);
  } else {
    return namePath;
  }
};

/**
 * 表单项名称转换
 * @param {string | (string | number)[]} name 需要转换的路径
 *
 * @example
 * // 传入路径为素组
 * let name = convertName(["field1","field2"]) // '["field1","field2"]'
 * // 传入路径为字符串
 * let name = convertName('["field1","field2"]') // ["field1","field2"]
 */
const convertName: ConvertNameInterface = (name) => {
  if (typeof name === "string") {
    try {
      let arrayName = JSON.parse(name);
      if (Array.isArray(arrayName)) {
        return arrayName;
      } else {
        return [arrayName];
      }
    } catch {
      return [name];
    }
  } else if (typeof name === "number") {
    return [name];
  } else {
    return JSON.stringify(name);
  }
};

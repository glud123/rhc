import { useEffect, useReducer, useContext } from "react";
import { FormContext, ItemContext, createFormStore } from "./context";
import * as utils from "../utils";
import {
  FormActionEnum,
  UseFormInterface,
  ValueType,
  NamePathType,
  GetInterface,
  SetInterface,
  RemoveInterface,
  ResetInterface,
  SubscribeInterface,
  ValidateInterface,
  FormAPIType,
  SubscribeValidateInterface,
  GetNameInterface,
  ConvertNameInterface,
  NamePath,
  useFormContextInterface,
  StoreType,
  FieldValueType,
  SubscribeOptionsType,
} from "../types";

const createFormAPI: () => FormAPIType = () => {
  let formInitialValue: ValueType = {};

  const { formsState, formsListeners, formsListeners4Validate, formsDestroy } =
    createFormStore();

  const KEY = Symbol("form") as any;

  const useForm: UseFormInterface = (formName) => {
    let currentFormListeners = formsListeners.get(formName);
    if (!currentFormListeners[KEY]) {
      formsListeners.set(formName, {
        [KEY]: new Set(),
      });
    }
    // 取值
    const get: GetInterface = (fieldName) => {
      let currentFormState = formsState.get(formName);
      if (utils.isNone(fieldName)) {
        return currentFormState;
      }
      if (utils.isArray(fieldName)) {
        if (fieldName.length === 0) {
          return currentFormState;
        }
        if (fieldName.length === 1) {
          return utils.getValue(fieldName[0], currentFormState);
        } else {
          return fieldName.map((fieldKey) => {
            return utils.getValue(fieldKey, currentFormState);
          });
        }
      } else {
        throw new Error("fieldName must be array or undefined!");
      }
    };
    // 设值
    const set: SetInterface = (fieldsValue) => {
      let currentFormState = formsState.get(formName);
      const { formListenersTrigger, fieldListenersTrigger } = listenerTrigger();
      if (utils.isObject(fieldsValue)) {
        const { fieldName, value } = fieldsValue as FieldValueType;
        if (fieldName === formName) {
          formsState.set(formName, value);
          // 触发表单监听器，并更新当前表单的状态
          formListenersTrigger(true);
        } else {
          utils.setValue(currentFormState, fieldsValue as FieldValueType);
          // 触发订阅了当前字段的监听器，并更新当前字段的状态
          fieldListenersTrigger(fieldsValue as FieldValueType);
        }
      }
      if (utils.isArray(fieldsValue)) {
        fieldsValue.forEach((fieldValue) => {
          const { fieldName, value } = fieldValue as FieldValueType;
          if (fieldName === formName) {
            formsState.set(formName, value);
            // 触发表单监听器，并更新当前表单的状态
            formListenersTrigger(true);
          } else {
            utils.setValue(currentFormState, fieldValue as FieldValueType);
            // 触发订阅了当前字段的监听器，并更新当前字段的状态
            fieldListenersTrigger(fieldValue as FieldValueType);
          }
        });
      }
      // 如果订阅了表单变化，通知其更新
      formListenersTrigger(false);
    };
    // 移除
    const remove: RemoveInterface = (fieldsName) => {
      let currentFormState = formsState.get(formName);
      const { formListenersTrigger, fieldListenersTrigger } = listenerTrigger();

      if (utils.isNone(fieldsName)) {
        formsState.set(formName, {});
        // 触发表单监听器，并更新当前表单的状态
        formListenersTrigger(true);
      }

      if (utils.isArray(fieldsName)) {
        fieldsName.forEach((fieldName) => {
          let parentFieldPath = utils.removeValue(currentFormState, fieldName);
          if (parentFieldPath && parentFieldPath.length > 0) {
            // 触发订阅了当前字段的父级字段监听器，并更新当前字段的状态
            let parentFieldValue = utils.getValue(
              parentFieldPath,
              currentFormState
            );
            fieldListenersTrigger({
              fieldName: parentFieldPath,
              value: parentFieldValue,
            });
          } else {
            // 触发表单监听器，并更新当前表单的状态
            formListenersTrigger(true);
          }
        });
      }
    };
    // 设置初始值
    const setInitialValue: SetInterface = (initialValue) => {
      formInitialValue[formName] = JSON.stringify(initialValue);
    };
    // 重置
    const reset: ResetInterface = () => {
      if (formInitialValue[formName]) {
        try {
          let formValue = JSON.parse(formInitialValue[formName]);
          set({
            fieldName: formName,
            value: formValue,
          });
        } catch (error) {
          throw new Error(error as string);
        }
      } else {
        set({
          fieldName: formName,
          value: {},
        });
      }
    };
    // 订阅 => 取消订阅
    const subscribe: SubscribeInterface = (options = {}) => {
      const [, forceUpdate] = useReducer((c) => c + 1, 0) as [
        never,
        () => void
      ];

      const { fieldsName, listener } = options;

      let nextListener = listener ? listener : forceUpdate;

      useEffect(() => {
        let currentFormListeners = formsListeners.get(formName);
        let unsubscribe: () => void = () => {};

        if (utils.isNone(fieldsName)) {
          if (currentFormListeners[KEY]) {
            currentFormListeners[KEY].add(nextListener);
          } else {
            currentFormListeners[KEY] = new Set();
            currentFormListeners[KEY].add(nextListener);
          }
          unsubscribe = () => {
            if (currentFormListeners && currentFormListeners[KEY]) {
              currentFormListeners[KEY].delete(nextListener);
            }
            formsDestroy(formName);
          };
        }

        if (utils.isArray(fieldsName)) {
          fieldsName.forEach((fieldName) => {
            if (fieldName === formName) {
              if (currentFormListeners[KEY]) {
                currentFormListeners[KEY].add(nextListener);
              } else {
                currentFormListeners[KEY] = new Set();
                currentFormListeners[KEY].add(nextListener);
              }
            } else {
              let namePath = utils.getFieldNamePath(formName);
              if (namePath) {
                if (!currentFormListeners[namePath]) {
                  currentFormListeners[namePath] = new Set();
                }
                currentFormListeners[namePath].add(nextListener);
              }
            }
          });
          unsubscribe = () => {
            fieldsName.forEach((fieldName) => {
              if (fieldName === formName) {
                if (currentFormListeners && currentFormListeners[KEY]) {
                  currentFormListeners[KEY].delete(nextListener);
                }
                formsDestroy(formName);
              } else {
                let namePath = utils.getFieldNamePath(formName);
                if (
                  namePath &&
                  currentFormListeners &&
                  currentFormListeners[namePath] &&
                  currentFormListeners[namePath].size > 0
                ) {
                  currentFormListeners[namePath].delete(nextListener);
                } else {
                  // 如果当前字段没有订阅者，则移除当前字段
                  formsDestroy(formName);
                }
              }
            });
          };
        }
        return unsubscribe;
      }, []);
    };
    // 触发表单校验
    const validate: ValidateInterface = (paths) => {
      let currentFormState = formsState.get(formName);
      let currentFormListeners4Validate = formsListeners4Validate.get(formName);

      if (Array.isArray(paths)) {
        let nextListener = paths
          .map((path) => {
            return utils.getFieldNamePath(formName);
          })
          .filter((path) => path && !!currentFormListeners4Validate[path])
          .map((path) => {
            return currentFormListeners4Validate[path as string](
              get(convertName(path as string) as any),
              currentFormState
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
        let allListeners = Object.keys(currentFormListeners4Validate).map(
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
        let currentFormListeners4Validate =
          formsListeners4Validate.get(formName);
        let unsubscribe: () => void = () => {};

        if (Array.isArray(paths)) {
          paths.forEach((path) => {
            let stringifyPath = convertName(path) as string;
            currentFormListeners4Validate[stringifyPath] = listener;
          });

          unsubscribe = () => {
            if (currentFormListeners4Validate) {
              paths.forEach((path) => {
                let stringifyPath = convertName(path) as string;
                delete currentFormListeners4Validate[stringifyPath];
              });
            }
          };
        }

        return unsubscribe;
      }, []);
    };
    /**
     * 触发订阅字段
     *
     */
    const listenerTrigger = () => {
      let currentFormState = formsState.get(formName);
      let currentFormListeners = formsListeners.get(formName);
      const formListenersTrigger = (isUpdate: boolean) => {
        // 如果订阅了表单变化，通知其更新
        if (currentFormListeners[KEY] && currentFormListeners[KEY].size > 0) {
          currentFormListeners[KEY].forEach(
            (listener: SubscribeOptionsType["listener"]) =>
              listener &&
              listener(
                currentFormState,
                currentFormState,
                isUpdate ? "update" : "static"
              )
          );
        }
      };
      const fieldListenersTrigger = (fieldValue: FieldValueType) => {
        const { fieldName, value } = fieldValue as FieldValueType;
        let currentFieldNamePath = utils.getFieldNamePath(fieldName);
        if (
          currentFieldNamePath &&
          currentFormListeners[currentFieldNamePath]
        ) {
          currentFormListeners[currentFieldNamePath].forEach(
            (listener: SubscribeOptionsType["listener"]) =>
              listener && listener(value, currentFormState)
          );
        }
      };
      return {
        formListenersTrigger,
        fieldListenersTrigger,
      };
    };
    return {
      name: formName,
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
      _private: {
        context: FormContext,
      },
    };
  };

  // 表单上下文hooks
  const useFormContext: useFormContextInterface = () => {
    const { formStore, dispatch } = useContext(FormContext);
    const dispatchStore = (state: StoreType) => {
      dispatch({
        type: FormActionEnum.Store,
        data: state,
      });
    };
    return [formStore.store, dispatchStore];
  };

  return { useForm, useFormContext };
};

export default createFormAPI;

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

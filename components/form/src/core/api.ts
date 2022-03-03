import { useEffect, useReducer, useContext } from "react";
import { FormContext, ItemContext, createFormStore } from "./context";
import * as utils from "../utils";
import {
  FormActionEnum,
  UseFormInterface,
  ValueType,
  GetInterface,
  SetInterface,
  RemoveInterface,
  ResetInterface,
  SubscribeInterface,
  ValidateInterface,
  FormAPIType,
  SubscribeValidateInterface,
  GetNameInterface,
  NamePathArray,
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
    /**
     * 表单取值 api
     * @param {FieldNamePath[] | undefined} fieldName 需要设置的字段名称或名称路径及值
     * @example
     * // 1. 获取当前表单所有字段的值
     * get();
     * // 2. 获取单个字段的值
     * get(['name']);
     * // 3. 获取多个字段的值
     * set([name", "age"]);
     */
    const get: GetInterface = (fieldsName) => {
      let currentFormState = formsState.get(formName);
      if (utils.isNone(fieldsName)) {
        return currentFormState;
      }
      if (utils.isArray(fieldsName)) {
        if (fieldsName.length === 0) {
          return currentFormState;
        }
        if (fieldsName.length === 1) {
          return utils.getValue(fieldsName[0], currentFormState);
        } else {
          return fieldsName.map((fieldKey) => {
            return utils.getValue(fieldKey, currentFormState);
          });
        }
      } else {
        throw new Error("fieldName must be array or undefined!");
      }
    };
    /**
     * 表单设值 api
     * @param {FieldValueType | FieldValueType[]} fieldsValue 需要设置的字段名称或名称路径及值
     * @example
     * // 1. 设置单个字段的值
     * set({fieldName: "name", value: "张三"});
     * // 2. 设置多个字段的值
     * set([{fieldName: "name", value: "张三"}, {fieldName: "age", value: 18}]);
     */
    const set: SetInterface = (fieldsValue) => {
      let currentFormState = formsState.get(formName);
      const { formListenersTrigger, fieldListenersTrigger } = listenerTrigger();
      // 单个字段设值
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
      // 多个字段设值
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
    /**
     * 表单删除 api
     * @param {FieldNamePath[] | undefined} fieldsName 要移除的表单字段名称或名称路径，不传则将当前表单数据清空
     */
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
    /**
     * 设置表单初始值数据
     */
    const setInitialValue: SetInterface = (initialValue) => {
      formInitialValue[formName] = JSON.stringify(initialValue);
    };
    /**
     * 重置表单数据状态
     * 将表单数据重置到初始值的状态
     */
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
    /**
     * 表单数据状态 订阅 => 取消订阅
     * @param {SubscribeOptionsType} options
     */
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
              const fieldNamePath = utils.ArrayToJSONString(fieldName);
              if (fieldNamePath) {
                if (!currentFormListeners[fieldNamePath]) {
                  currentFormListeners[fieldNamePath] = new Set();
                }
                currentFormListeners[fieldNamePath].add(nextListener);
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
                const fieldNamePath = utils.ArrayToJSONString(fieldName);
                if (
                  fieldNamePath &&
                  currentFormListeners &&
                  currentFormListeners[fieldNamePath] &&
                  currentFormListeners[fieldNamePath].size > 0
                ) {
                  currentFormListeners[fieldNamePath].delete(nextListener);
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
    /**
     * 触发表单校验
     * @param {FieldNamePath[] | undefined} paths 校验字段名称数组
     * @returns {Promise<void>}
     */
    const validate: ValidateInterface = (paths) => {
      let currentFormState = formsState.get(formName);
      let currentFormListeners4Validate = formsListeners4Validate.get(formName);
      if (utils.isArray(paths)) {
        let nextListener = paths
          .map((path) => {
            return utils.ArrayToJSONString(path);
          })
          .filter((path) => path && !!currentFormListeners4Validate[path])
          .map((path) => {
            let fieldValue = get(utils.JSONStringToArray(path));
            return currentFormListeners4Validate[path as string](
              fieldValue,
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
          (path) => utils.JSONStringToArray(path)
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
        if (utils.isArray(paths)) {
          paths.forEach((path) => {
            let stringifyPath = utils.ArrayToJSONString(path);
            if (!utils.isNone(stringifyPath)) {
              currentFormListeners4Validate[stringifyPath] = listener;
            }
          });
          unsubscribe = () => {
            if (currentFormListeners4Validate) {
              paths.forEach((path) => {
                let stringifyPath = utils.ArrayToJSONString(path);
                if (!utils.isNone(stringifyPath)) {
                  delete currentFormListeners4Validate[stringifyPath];
                }
              });
            }
          };
        }
        return unsubscribe;
      }, []);
    };
    /**
     * 触发订阅字段
     * @returns {(isUpdate: boolean)=>void} formListenersTrigger
     * @returns {(fieldValue: FieldValueType)=>void} fieldListenersTrigger
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
        let currentFieldNamePath = utils.ArrayToJSONString(fieldName);
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
      getFieldName: getName,
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
const getName: GetNameInterface = (pathOffset = 0) => {
  const itemContext = useContext(ItemContext);
  let namePath: NamePathArray = [];
  if (itemContext && (itemContext as any).__parent) {
    namePath = [...(itemContext as any).__parent];
  }
  namePath = namePath.splice(0, namePath.length - pathOffset);
  return namePath;
};

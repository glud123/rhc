import { useEffect, useReducer, useContext } from "react";
import { ItemContext, createFormStore } from "./context";
import * as utils from "../utils";
import {
  UseFormInterface,
  ValueType,
  CreateGetValuesInterface,
  CreateSetValuesInterface,
  SetDefaultValueInterface,
  SetValuesInterface,
  CreateRemoveValuesInterface,
  ResetValuesInterface,
  CreateSubscribeInterface,
  ValidateInterface,
  CreateValidateInterface,
  FormAPIType,
  CreateSubscribeValidateInterface,
  GetFieldNameInterface,
  NamePathArray,
  FieldValueType,
  FormStateType,
  CreateSetStateInterface,
  CreateSubscribeStateInterface,
  CreateSubscribeStoreInterface,
  CreateSetSoreInterface,
  CreateGetSoreInterface,
  ListenerTriggerInterface,
  NamePath,
} from "../types";

const createFormAPI: () => FormAPIType = () => {
  let formDefaultValue: ValueType = {};
  const {
    formsState,
    formsListeners,
    formsListeners4Validate,
    formsState4Form,
    formsListeners4FormState,
    formsStore,
    formsListeners4Store,
    formsDestroy,
  } = createFormStore();
  const useForm: UseFormInterface = (formName) => {
    // 取值
    const getValues = createGetValues(formName, formsState);
    // 设值
    const setValues = createSetValues(formName, formsState, formsListeners);
    // 删除值
    const removeValues = createRemoveValues(
      formName,
      formsState,
      formsListeners
    );
    /**
     * 设置表单初始值数据
     */
    const setDefaultValue: SetDefaultValueInterface = (defaultValue) => {
      formDefaultValue[formName] = JSON.stringify(defaultValue);
    };
    /**
     * 重置表单数据状态
     * 将表单数据重置到初始值的状态
     */
    const resetValues: ResetValuesInterface = () => {
      if (formDefaultValue[formName]) {
        try {
          let formValue = JSON.parse(formDefaultValue[formName]);
          setValues({
            fieldName: formName,
            value: formValue,
          });
        } catch (error) {
          throw new Error(error as string);
        }
      } else {
        setValues({
          fieldName: formName,
          value: {},
        });
      }
    };
    // 表单字段订阅
    const subscribe = createSubscribe(formName, formsListeners, formsDestroy);
    // 表单字段校验
    const validate = createValidate(
      formName,
      formsState,
      formsListeners4Validate,
      getValues
    );
    // 表单字段订阅校验
    const subscribeValidate = createSubscribeValidate(
      formName,
      formsListeners4Validate
    );
    // 表单状态
    const setState = createSetState(
      formName,
      formsState4Form,
      formsListeners4FormState
    );
    // 表单状态订阅
    const subscribeState = createSubscribeState(
      formName,
      formsState4Form,
      formsListeners4FormState
    );
    // 表单提供的数据仓库 获取
    const getStore = createGetStore(formName, formsStore);
    // 表单提供的数据仓库 设值
    const setStore = createSetStore(formName, formsStore, formsListeners4Store);
    // 表单提供的数据仓库 订阅
    const subscribeStore = createSubscribeStore(
      formName,
      formsStore,
      formsListeners4Store
    );
    return {
      name: formName,
      setValues,
      getValues,
      removeValues,
      resetValues,
      setDefaultValue,
      subscribe,
      validate,
      subscribeValidate,
      setState,
      subscribeState,
      getStore,
      setStore,
      subscribeStore,
      getFieldName: getFieldName,
    };
  };
  return { useForm };
};

export default createFormAPI;

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
const createGetValues: CreateGetValuesInterface = (formName, formsState) => {
  return (fieldsName) => {
    let currentFormState = formsState.get(formName);
    if (utils.isNone(fieldsName)) {
      return utils.getValue(fieldsName, currentFormState);
    }
    if (utils.isArray(fieldsName)) {
      if (fieldsName.length <= 1) {
        return utils.getValue(fieldsName[0], currentFormState);
      } else {
        // 获取多个单层字段的值 返回 { 字段名: 字段值 }
        let isSingleFieldName = fieldsName.every((item) => {
          return utils.isString(item) || utils.isNumber(item);
        });
        if (isSingleFieldName) {
          let result: { [k: string]: any } = {};
          fieldsName.forEach((fieldKey) => {
            result[fieldKey as unknown as NamePath] = utils.getValue(
              fieldKey,
              currentFormState
            );
          });
          return result;
        } else {
          // 获取多个多层字段的值 返回 [{ fieldName: 字段路径, value: 字段值 }, ...]
          return fieldsName.map((fieldKey) => {
            return {
              fieldName: fieldKey,
              value: utils.getValue(fieldKey, currentFormState),
            };
          });
        }
      }
    } else {
      throw new Error("fieldName must be array or undefined!");
    }
  };
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
const createSetValues: CreateSetValuesInterface = (
  formName,
  formsState,
  formsListeners
) => {
  return (fieldsValue) => {
    let currentFormState = formsState.get(formName);
    const { formListenersTrigger, fieldListenersTrigger } = listenerTrigger(
      formName,
      formsState,
      formsListeners
    );
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
};

/**
 * 表单删除 api
 * @param {FieldNamePath[] | undefined} fieldsName 要移除的表单字段名称或名称路径，不传则将当前表单数据清空
 */
const createRemoveValues: CreateRemoveValuesInterface = (
  formName,
  formsState,
  formsListeners
) => {
  return (fieldsName) => {
    let currentFormState = formsState.get(formName);
    const { formListenersTrigger, fieldListenersTrigger } = listenerTrigger(
      formName,
      formsState,
      formsListeners
    );
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
};

/**
 * 表单数据状态 订阅 => 取消订阅
 * @param {SubscribeOptionsType} options
 */
const createSubscribe: CreateSubscribeInterface = (
  formName,
  formsListeners,
  formsDestroy
) => {
  return (options = {}, deps = []) => {
    const [, forceUpdate] = useReducer((c) => c + 1, 0) as [never, () => void];
    const { fieldsName, listener } = options;
    let nextListener = listener ? listener : forceUpdate;
    useEffect(() => {
      let currentFormListeners = formsListeners.get(formName);
      const { addListener, removeListener } =
        utils.listenerOperation(currentFormListeners);
      let unsubscribe: () => void = () => {};
      if (utils.isNone(fieldsName)) {
        addListener(formName, nextListener);
        unsubscribe = () => {
          const currentListenerNumber = removeListener(formName, nextListener);
          if (currentListenerNumber === 0) {
            formsDestroy(formName);
          }
        };
      }
      if (utils.isArray(fieldsName)) {
        fieldsName.forEach((fieldName) => {
          const listenerName =
            fieldName === formName
              ? formName
              : utils.ArrayToJSONString(fieldName);
          addListener(listenerName, nextListener);
        });
        unsubscribe = () => {
          fieldsName.forEach((fieldName) => {
            const listenerName =
              fieldName === formName
                ? formName
                : utils.ArrayToJSONString(fieldName);
            const currentListenerNumber = removeListener(
              listenerName,
              nextListener
            );
            if (currentListenerNumber === 0) {
              formsDestroy(listenerName);
            }
          });
        };
      }
      return unsubscribe;
    }, deps);
  };
};

/**
 * 触发表单校验
 * @param {FieldNamePath[] | undefined} paths 校验字段名称数组
 * @returns {Promise<void>}
 */
const createValidate: CreateValidateInterface = (
  formName,
  formsState,
  formsListeners4Validate,
  getValues
) => {
  const validate: ValidateInterface = (paths) => {
    let currentFormState = formsState.get(formName);
    let currentFormListeners4Validate = formsListeners4Validate.get(formName);
    const { triggerListener } = utils.listenerOperation(
      currentFormListeners4Validate
    );
    if (utils.isArray(paths)) {
      let nextListener = paths
        .map((path) => {
          return utils.ArrayToJSONString(path);
        })
        .filter((path) => path && !!currentFormListeners4Validate[path])
        .map((path) => {
          let fieldValue = getValues(utils.JSONStringToArray(path));
          return triggerListener(
            path,
            fieldValue,
            currentFormState
          ) as unknown as Promise<any>[];
        })
        .reduce((prev, cur) => prev.concat(cur), []);
      return Promise.allSettled(nextListener).then((results) => {
        let rejecteds = results
          .filter((result) => result.status === "rejected")
          .map((result: any) => result.reason);
        if (rejecteds.length > 0) {
          return Promise.reject(rejecteds);
        } else {
          let fieldsValue = getValues(paths);
          return Promise.resolve(fieldsValue);
        }
      });
    } else {
      let allListeners = Object.keys(currentFormListeners4Validate).map(
        (path) => utils.JSONStringToArray(path)
      );
      return validate(allListeners);
    }
  };
  return validate;
};

/**
 * 订阅字段校验 => 取消订阅字段校验 （表单字段进行校验时触发）
 * @param options
 */
const createSubscribeValidate: CreateSubscribeValidateInterface = (
  formName,
  formsListeners4Validate
) => {
  return (options, deps = []) => {
    const { paths, listener } = options;
    useEffect(() => {
      let currentFormListeners4Validate = formsListeners4Validate.get(formName);
      const { addListener, removeListener } = utils.listenerOperation(
        currentFormListeners4Validate
      );
      let unsubscribe: () => void = () => {};
      if (utils.isArray(paths)) {
        paths.forEach((path) => {
          const stringifyPath = utils.ArrayToJSONString(path);
          addListener(stringifyPath, listener);
        });
        unsubscribe = () => {
          if (currentFormListeners4Validate) {
            paths.forEach((path) => {
              let stringifyPath = utils.ArrayToJSONString(path);
              removeListener(stringifyPath, listener);
            });
          }
        };
      }
      return unsubscribe;
    }, deps);
  };
};

/**
 * 触发订阅字段
 * @returns {(isUpdate: boolean)=>void} formListenersTrigger
 * @returns {(fieldValue: FieldValueType)=>void} fieldListenersTrigger
 */
const listenerTrigger: ListenerTriggerInterface = (
  formName,
  formsState,
  formsListeners
) => {
  let currentFormState = formsState.get(formName);
  let currentFormListeners = formsListeners.get(formName);
  const { triggerListener } = utils.listenerOperation(currentFormListeners);
  const formListenersTrigger = (isUpdate: boolean) => {
    // 如果订阅了表单变化，通知其更新
    triggerListener(
      formName,
      currentFormState,
      currentFormState,
      isUpdate ? "update" : "static"
    );
  };
  const fieldListenersTrigger = (fieldValue: FieldValueType) => {
    const { fieldName, value } = fieldValue as FieldValueType;
    let currentFieldNamePath = utils.ArrayToJSONString(fieldName);
    triggerListener(currentFieldNamePath, value, currentFormState);
  };
  return {
    formListenersTrigger,
    fieldListenersTrigger,
  };
};

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
const getFieldName: GetFieldNameInterface = (pathOffset = 0) => {
  const itemContext = useContext(ItemContext);
  let namePath: NamePathArray = [];
  if (itemContext && (itemContext as any).__parent) {
    namePath = [...(itemContext as any).__parent];
  }
  namePath = namePath.splice(0, namePath.length - pathOffset);
  return namePath;
};

/**
 * 设置表单基础状态
 * 状态清单：
 * @param {boolean} disabled 表单是否可用
 */
const createSetState: CreateSetStateInterface = (
  formName,
  formsState4Form,
  formsListeners4FormState
) => {
  return (state) => {
    // 单个字段设值
    if (utils.isObject(state)) {
      let currentformsState4Form = formsState4Form.get(formName);
      Object.keys(state).forEach((item) => {
        utils.setValue(currentformsState4Form, {
          fieldName: item,
          value: (state as any)[item],
        } as FieldValueType);
      });
      let currentFormsListeners4FormState =
        formsListeners4FormState.get(formName);
      const { triggerListener } = utils.listenerOperation(
        currentFormsListeners4FormState
      );
      triggerListener(formName);
    }
  };
};

/**
 * 表单基础状态 订阅 => 取消订阅
 * @returns {FormStateType} 表单基础状态
 */
const createSubscribeState: CreateSubscribeStateInterface = (
  formName,
  formsState4Form,
  formsListeners4FormState
) => {
  return (deps = []) => {
    const [, forceUpdate] = useReducer((c) => c + 1, 0) as [never, () => void];
    useEffect(() => {
      let currentFormsListeners4FormState =
        formsListeners4FormState.get(formName);
      const { addListener, removeListener } = utils.listenerOperation(
        currentFormsListeners4FormState
      );
      let unsubscribe: () => void = () => {};
      addListener(formName, forceUpdate);
      unsubscribe = () => {
        removeListener(formName, forceUpdate);
      };
      return unsubscribe;
    }, deps);
    return formsState4Form.get(formName) as FormStateType;
  };
};

/**
 * 表单提供出来的数据仓库
 */
const createGetStore: CreateGetSoreInterface = (formName, formsStore) => {
  return (names) => {
    let currentFormStore = formsStore.get(formName);
    if (utils.isNone(names) || utils.isString(names)) {
      return utils.getValue(names, currentFormStore);
    }
    if (utils.isArray(names)) {
      if (names.length <= 1) {
        return utils.getValue(names[0], currentFormStore);
      } else {
        let result: { [k: string]: any } = {};
        names.forEach((fieldKey) => {
          result[fieldKey] = utils.getValue(fieldKey, currentFormStore);
        });
        return result;
      }
    } else {
      throw new Error("fieldName must be array or undefined!");
    }
  };
};

/**
 * 表单提供出来的数据仓库
 */
const createSetStore: CreateSetSoreInterface = (
  formName,
  formsStore,
  formsListeners4Store
) => {
  return (storeValue) => {
    if (utils.isObject(storeValue)) {
      let currentFormsStore = formsStore.get(formName);
      const { triggerListener } = utils.listenerOperation(
        formsListeners4Store.get(formName)
      );
      Object.keys(storeValue).forEach((item) => {
        utils.setValue(currentFormsStore, {
          fieldName: item,
          value: (storeValue as any)[item],
        } as FieldValueType);
        triggerListener(item);
      });
    }
  };
};

/**
 * 表单数据仓库 订阅 => 取消订阅
 * @returns {FormStateType} 表单数据仓库
 */
const createSubscribeStore: CreateSubscribeStoreInterface = (
  formName,
  formsStore,
  formsListeners4Store
) => {
  return (storeListener, deps) => {
    const { name, listener } = storeListener;
    const [, forceUpdate] = useReducer((c) => c + 1, 0) as [never, () => void];
    let currentListener = listener ? listener : forceUpdate;
    useEffect(() => {
      const { addListener, removeListener } = utils.listenerOperation(
        formsListeners4Store.get(formName)
      );
      let unsubscribe: () => void = () => {};
      addListener(name, currentListener);
      unsubscribe = () => {
        removeListener(name, currentListener);
      };
      return unsubscribe;
    }, deps);
    return formsStore.get(name);
  };
};

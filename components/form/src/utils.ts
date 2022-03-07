import type { FieldValueType, FieldNamePath } from "./types";

/**
 * 判断是否是字符串
 * @param {any} args
 * @returns {boolean}
 */
export const isString = (args: any): args is string => typeof args === "string";
/**
 * 判断是否是数字
 * @param {any} args
 * @returns {boolean}
 */
export const isNumber = (args: any): args is number => typeof args === "number";
/**
 * 判断是否是 undefined 或者 null
 * @param {any} args
 * @returns {boolean}
 */
export const isNone = (args: any): args is undefined | null =>
  typeof args === "undefined" || args === null;
/**
 * 判断是否是数组
 * @param {any} args
 * @returns {boolean}
 */
export const isArray = (args: any): args is any[] => Array.isArray(args);
/**
 * 判断是否是对象
 * @param {any} args
 * @returns {boolean}
 */
export const isObject = (args: any): args is { [k: string]: any } =>
  Object.prototype.toString.call(args).toLowerCase() === "[object object]";
/**
 * 按路径取值
 * @param {any} paths
 * @param {any} value
 * @returns {any}
 */
export const getValue = (paths: any, value: any = {}) => {
  let resolve = {};
  let copyValue = JSON.parse(JSON.stringify(value));
  if (isNone(paths)) {
    resolve = copyValue;
  }
  if (isString(paths) || isNumber(paths)) {
    resolve = copyValue[paths];
  }
  if (isArray(paths)) {
    let lastIndex = paths.length - 1;
    paths.reduce(
      (
        prev: { nextValue: any; resolve: any },
        cur: string | number,
        index: number
      ) => {
        const { nextValue, resolve } = prev;
        const current = nextValue[cur];
        if (isObject(current)) {
          if (lastIndex !== index) {
            resolve[cur] = {};
          }
        }
        if (isArray(current)) {
          if (lastIndex !== index) {
            resolve[cur] = [];
          }
        }
        if (lastIndex === index) {
          resolve[cur] = current;
        }
        return {
          nextValue: current,
          resolve: resolve,
        };
      },
      {
        nextValue: copyValue,
        resolve: resolve,
      }
    );
  }
  return resolve;
};
/**
 * 按路径设值
 * @param {any} allValue
 * @param {FieldValueType} fieldsValue
 */
export const setValue = (allValue: any, fieldsValue: FieldValueType) => {
  const { fieldName, value } = fieldsValue;
  if (isNone(fieldName)) {
    return;
  }
  if (isString(fieldName) || isNumber(fieldName)) {
    allValue[fieldName] = value;
  }
  if (isArray(fieldName)) {
    let lastIndex = fieldName.length - 1;
    fieldName.reduce((prev: any, cur: string | number, index: number) => {
      if (lastIndex !== index) {
        return prev[cur];
      } else {
        prev[cur] = value;
      }
    }, allValue);
  }
};
/**
 * 按路径删除值
 * @param {any} allValue
 * @param {FieldNamePath} fieldName
 * @returns {FieldNamePath} 当前字段父级路径
 */
export const removeValue = (allValue: any, fieldName: FieldNamePath) => {
  if (isNone(fieldName)) {
    return;
  }
  let parentFieldPath: FieldNamePath = [];
  if (isString(fieldName) || isNumber(fieldName)) {
    delete allValue[fieldName];
  }
  if (isArray(fieldName)) {
    let lastIndex = fieldName.length - 1;
    fieldName.reduce((prev: any, cur: string | number, index: number) => {
      if (lastIndex !== index) {
        return prev[cur];
      } else {
        delete prev[cur];
      }
    }, allValue);
    parentFieldPath = fieldName.slice(0, -1);
  }
  return parentFieldPath;
};
/**
 * 获取字段路径字符串
 * @param {FieldNamePath} fieldName 字段路径数组
 * @returns {string} 字段路径JSON字符串
 */
export const ArrayToJSONString: (arrayPath: FieldNamePath) => string = (
  arrayPath
) => {
  let stringPath: string = "[]";
  if (isString(arrayPath) || isNumber(arrayPath)) {
    stringPath = JSON.stringify([arrayPath]);
  }
  if (isArray(arrayPath)) {
    stringPath = JSON.stringify(arrayPath);
  }
  return stringPath;
};
/**
 * 将JSON字符串字段路径转成数组
 * @param {string | undefined} fieldName 字段路径JSON字符串
 * @returns {(string | number)[]} 字段路径数组
 */
export const JSONStringToArray: (stringPath: string) => (string | number)[] = (
  stringPath
) => {
  let arrayPath: (string | number)[] = [];
  try {
    if (isNone(stringPath)) {
      arrayPath = [];
    } else {
      arrayPath = JSON.parse(stringPath);
    }
  } catch (error) {
    arrayPath = [];
  }
  return arrayPath;
};

type ListenerOperationType = {
  addListener: (key: string, callback: (...args: any[]) => void) => void;
  removeListener: (key: string, callback: (...args: any[]) => void) => number;
  triggerListener: (key: string, ...args: any[]) => void;
};
/**
 * 创建监听器操作方法
 * @param {any} listener
 */
export const listenerOperation: (listener: any) => ListenerOperationType = (
  listener
) => {
  const addListener = (key: string, callback: (...args: any[]) => void) => {
    if (isNone(listener[key])) {
      listener[key] = new Set();
    }
    listener[key].add(callback);
  };
  const removeListener = (key: string, callback: (...args: any[]) => void) => {
    if (listener[key] && listener[key].has(callback)) {
      listener[key].delete(callback);
    }
    return listener[key].size;
  };
  const triggerListener = (key: string, ...args: any[]) => {
    if (!isNone(listener[key])) {
      return [...listener[key]].map(
        (listenerItem: (...args: any[]) => any) =>
          listenerItem && listenerItem(...args)
      );
    }
  };
  return {
    addListener,
    removeListener,
    triggerListener,
  };
};

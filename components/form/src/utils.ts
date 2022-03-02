import type { FieldValueType, NamePath } from "./types";

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
  if (isNone(paths)) {
    resolve = value;
  }
  if (isString(paths) || isNumber(paths)) {
    resolve = value[paths];
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
        nextValue: value,
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
 * @param {NamePath} fieldName
 * @returns {NamePath} parentFieldPath
 */
export const removeValue = (allValue: any, fieldName: NamePath) => {
  if (isNone(fieldName)) {
    return;
  }
  let parentFieldPath: NamePath = [];
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
 */
export const getFieldNamePath: (fieldName: NamePath) => string | undefined = (
  fieldName
) => {
  let path: string | undefined;

  if (isString(fieldName) || isNumber(fieldName)) {
    path = JSON.stringify([fieldName]);
  }

  if (isArray(fieldName)) {
    path = JSON.stringify(fieldName);
  }

  return path;
};

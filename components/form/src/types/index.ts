import type { Dispatch } from "react";
import type { WrapperItemType } from "../wrapper/Item";
import type { WrapperValidationType } from "../wrapper/Validation";

/**
 * 表单核心-逻辑处理组件
 * FormCoreType : 表单核心组件类型
 * FormListType : 表单字段数组化组件类型
 * FormItemType : 表单字段组件类型
 */
export type { FormCoreType } from "../core/FormCore";
export type { FormListType } from "../core/FormList";
export type { FormItemType } from "../core/FormItem";

/**
 * 表单插件-渲染容器组件
 * WrapperItemType : 表单项渲染容器类型
 * WrapperValidationType : 表单项校验渲染容器类型
 */
export type { WrapperItemType } from "../wrapper/Item";
export type { WrapperValidationType } from "../wrapper/Validation";

/**
 * 表单实例类型
 */
export type FormInstanceType = {
  name: string;
  set: SetInterface;
  get: GetInterface;
  remove: RemoveInterface;
  reset: ResetInterface;
  setInitialValue: SetInterface;
  subscribe: SubscribeInterface;
  validate: ValidateInterface;
  subscribeValidate: SubscribeValidateInterface;
  setState: SetStateInterface;
  subscribeState: SubscribeStateInterface;
  getStore: GetSoreInterface;
  setStore: SetSoreInterface;
  subscribeSore: SubscribeSoreInterface;
  getFieldName: GetNameInterface;
};

export enum FormActionEnum {
  Form = "form",
  State = "state",
  Update = "update",
  Wrapper = "wrapper",
  Store = "store",
}

/**
 * 表单项容器类型
 * wrapperItem : 表单项渲染容器类型
 * wrapperValidation : 表单项校验渲染容器类型
 */
export type WrapperType = {
  wrapperValidation?: WrapperValidationType;
  wrapperItem?: WrapperItemType;
};

/**
 * 表单状态
 * @param {boolean} isEdit 是否编辑态
 */
export type StateType = {
  isEdit: boolean;
};

/**
 * 表单容器内自定义数据存储
 * kv 形式存储
 */
export type StoreType = {
  [k: string]: any;
};

/**
 * 表单容器数据状态
 * @param {FormInstanceType} form 表单实例
 * @param {WrapperType} wrapper 表单项渲染容器
//  * @param {StateType} state 表单状态
//  * @param {StoreType} store 表单容器范围内自定义数据存储
 */
export type FormContextStoreType = {
  form: FormInstanceType;
  wrapper: WrapperType;
};

type FormReducerActionType = {
  type: FormActionEnum;
  data?: FormInstanceType | WrapperType | StateType | StoreType;
};

export type FormContextType = {
  formStore: FormContextStoreType;
  dispatch: Dispatch<FormReducerActionType>;
};

export interface FormReducerInterface {
  (
    state: FormContextStoreType,
    action: FormReducerActionType
  ): FormContextStoreType;
}

export type ValueType = {
  [k: string]: any;
};

export type ListenersType = {
  [k: string]: any;
};
// 字段名称路径
export type NamePath = string | number;

export type NamePathArray = NamePath[];

export type FieldNamePath = NamePath | NamePathArray;

export type SubscribeOptionsType = {
  fieldsName?: FieldNamePath[];
  listener?: (
    fieldValue: any,
    formValues: any,
    state?: "update" | "static"
  ) => void;
};
export interface GetInterface {
  (fieldsName?: FieldNamePath[]): { [k: string]: any } | undefined;
}

export type FieldValueType = {
  fieldName: FieldNamePath;
  value: any;
};
export interface SetInterface {
  (fieldsValue: FieldValueType | FieldValueType[]): void;
}

export interface RemoveInterface {
  (fieldsName?: FieldNamePath[]): void;
}

export interface ResetInterface {
  (): void;
}

export interface SubscribeInterface {
  (options?: SubscribeOptionsType): void;
}

export interface UseFormInterface {
  (name: string): FormInstanceType;
}

export type SubscribeValidateType = {
  paths: FieldNamePath[];
  listener: (value: any, allValues: any) => Promise<any>;
};

export interface SubscribeValidateInterface {
  (options: SubscribeValidateType): void;
}

export interface ValidateInterface {
  (paths?: FieldNamePath[]): Promise<any>;
}

export type FormAPIType = {
  useForm: UseFormInterface;
};

export interface GetNameInterface {
  (pathOffset?: number): NamePathArray;
}

export type FormStateType = {
  disabled: boolean;
};

export interface SubscribeStateInterface {
  (): FormStateType;
}

export interface SetStateInterface {
  (state: FormStateType): void;
}

type StoreListenerType = {
  name: string;
  listener?: (value: any) => void;
};
export interface SubscribeSoreInterface {
  (storeListener: StoreListenerType): StoreType;
}

export interface SetSoreInterface {
  (storeValue: StoreType): void;
}

export interface GetSoreInterface {
  (names?: string | string[]): StoreType;
}

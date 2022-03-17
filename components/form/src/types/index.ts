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
  setValues: SetValuesInterface;
  getValues: GetValuesInterface;
  removeValues: RemoveValuesInterface;
  resetValues: ResetValuesInterface;
  setDefaultValue: SetDefaultValueInterface;
  subscribe: SubscribeInterface;
  validate: ValidateInterface;
  subscribeValidate: SubscribeValidateInterface;
  setState: SetStateInterface;
  subscribeState: SubscribeStateInterface;
  getStore: GetSoreInterface;
  setStore: SetSoreInterface;
  subscribeStore: SubscribeStoreInterface;
  getFieldName: GetFieldNameInterface;
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
  data?: FormInstanceType | WrapperType;
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

export interface CreateGetValuesInterface {
  (
    formName: string,
    formsState: CreateFormStoreType["formsState"]
  ): GetValuesInterface;
}

export interface GetValuesInterface<
  T = FieldNamePath[] | NamePathArray | NamePath
> {
  (fieldsName?: T): T extends FieldNamePath[]
    ? FieldValueType[]
    : T extends NamePathArray
    ? { [k: string]: any }
    : T extends NamePath
    ? any
    : { [k: string]: any };
}

export type FieldValueType = {
  fieldName: FieldNamePath;
  value: any;
};

export interface CreateSetValuesInterface {
  (
    formName: string,
    formsState: CreateFormStoreType["formsState"],
    formsListeners: CreateFormStoreType["formsListeners"]
  ): SetValuesInterface;
}

export interface SetValuesInterface {
  (fieldsValue: FieldValueType | FieldValueType[]): void;
}

export interface SetDefaultValueInterface {
  (fieldsValue: any): void;
}

export interface CreateRemoveValuesInterface {
  (
    formName: string,
    formsState: CreateFormStoreType["formsState"],
    formsListeners: CreateFormStoreType["formsListeners"]
  ): RemoveValuesInterface;
}

export interface RemoveValuesInterface {
  (fieldsName?: FieldNamePath[]): void;
}

export interface ResetValuesInterface {
  (): void;
}

export interface CreateSubscribeInterface {
  (
    formName: string,
    formsListeners: CreateFormStoreType["formsListeners"],
    formsDestroy: CreateFormStoreType["formsDestroy"]
  ): SubscribeInterface;
}

export interface SubscribeInterface {
  (options?: SubscribeOptionsType, deps?: any[], fromFormItem?: boolean): void;
}

export interface UseFormInterface {
  (name: string): FormInstanceType;
}

export type SubscribeValidateType = {
  paths: FieldNamePath[];
  listener: (value: any, allValues: any) => Promise<any>;
};

export interface CreateSubscribeValidateInterface {
  (
    formName: string,
    formsListeners4Validate: CreateFormStoreType["formsListeners4Validate"]
  ): SubscribeValidateInterface;
}

export interface SubscribeValidateInterface {
  (options: SubscribeValidateType, deps?: any[]): void;
}

export interface CreateValidateInterface {
  (
    formName: string,
    formsState: CreateFormStoreType["formsState"],
    formsListeners4Validate: CreateFormStoreType["formsListeners4Validate"],
    getValues: GetValuesInterface
  ): ValidateInterface;
}

export interface ValidateInterface {
  (paths?: FieldNamePath[]): Promise<any>;
}

export type FormAPIType = {
  useForm: UseFormInterface;
};

export interface GetFieldNameInterface {
  (pathOffset?: number): NamePathArray;
}

export type FormStateType = {
  disabled: boolean;
};

export interface CreateSubscribeStateInterface {
  (
    formName: string,
    formsState4Form: CreateFormStoreType["formsState4Form"],
    formsListeners4FormState: CreateFormStoreType["formsListeners4FormState"]
  ): SubscribeStateInterface;
}

export interface SubscribeStateInterface {
  (deps?: any[]): FormStateType;
}

export interface CreateSetStateInterface {
  (
    formName: string,
    formsState4Form: CreateFormStoreType["formsState4Form"],
    formsListeners4FormState: CreateFormStoreType["formsListeners4FormState"]
  ): SetStateInterface;
}

export interface SetStateInterface {
  (state: FormStateType): void;
}

type StoreListenerType = {
  name: string;
  listener?: (value: any) => void;
};

export interface CreateSubscribeStoreInterface {
  (
    formName: string,
    formsStore: CreateFormStoreType["formsStore"],
    formsListeners4Store: CreateFormStoreType["formsListeners4Store"]
  ): SubscribeStoreInterface;
}

export interface SubscribeStoreInterface {
  (storeListener: StoreListenerType, deps?: any[]): StoreType;
}

export interface CreateSetSoreInterface {
  (
    formName: string,
    formsStore: CreateFormStoreType["formsStore"],
    formsListeners4Store: CreateFormStoreType["formsListeners4Store"]
  ): SetSoreInterface;
}

export interface SetSoreInterface {
  (storeValue: StoreType): void;
}

export interface CreateGetSoreInterface {
  (
    formName: string,
    formsStore: CreateFormStoreType["formsStore"]
  ): GetSoreInterface;
}

export interface GetSoreInterface {
  (names?: string | string[]): StoreType;
}

type FormStoreGetType = (formName: string) => { [k: string]: any };

type FormStoreSetType = (formName: string, nextState: any) => void;

type CreateFormStoreType = {
  [k in
    | "formsState"
    | "formsListeners"
    | "formsListeners4Validate"
    | "formsState4Form"
    | "formsListeners4FormState"
    | "formsStore"
    | "formsListeners4Store"]: {
    get: FormStoreGetType;
    set: FormStoreSetType;
  };
} & {
  formsDestroy: (formName: string) => void;
};

export interface CreateFormStoreInterface {
  (): CreateFormStoreType;
}

type ListenerTriggerType = {
  formListenersTrigger: (isUpdate: boolean) => void;
  fieldListenersTrigger: (fieldValue: FieldValueType) => void;
};

export interface ListenerTriggerInterface {
  (
    formName: string,
    formsState: CreateFormStoreType["formsState"],
    formsListeners: CreateFormStoreType["formsListeners"]
  ): ListenerTriggerType;
}

import type { ReactNode, Dispatch } from "react";
import type { ValidationType } from "../Validation";

export type Validation = ValidationType;

export type ContextType = {
  [k: string]: any;
};

export type ListenersType = {
  [k: string]: any;
};

export type NamePath = (string | number)[];

export type NamesPath = NamePath[];

export type NamePathType = number | string | NamePath;

type SubscribeOptionsType = {
  paths?: NamesPath;
  listener?: any;
};

type ItemType = {
  getName: GetNameInterface;
  convertName: ConvertNameInterface;
};
export interface GetInterface {
  (path?: NamePath): { [k: string]: any };
}

export interface SetInterface {
  (nextContext: ContextType): void;
}

export interface RemoveInterface {
  (path?: NamePath): Promise<void>;
}

export interface ResetInterface {
  (): void;
}

export interface SubscribeInterface {
  (options?: SubscribeOptionsType): void;
}

export interface UseFormInterface {
  (name: string): FormType;
}

export type SubscribeValidateType = {
  paths: NamesPath;
  listener: (value: any, allValues: any) => Promise<any>;
};

export interface SubscribeValidateInterface {
  (options: SubscribeValidateType): void;
}

export interface ValidateInterface {
  (paths?: NamesPath): Promise<any>;
}

export interface CreateInterface {
  (): { useForm: UseFormInterface; useFormContext: useFormContextInterface };
}

export interface GetNameInterface {
  (pathOffset?: number, type?: "string" | "array"): string | NamePath;
}

export interface ConvertNameInterface {
  (path: NamePathType): NamePathType;
}

export type FormType = {
  name: string;
  set: SetInterface;
  get: GetInterface;
  remove: RemoveInterface;
  reset: ResetInterface;
  setInitialValue: SetInterface;
  subscribe: SubscribeInterface;
  validate: ValidateInterface;
  subscribeValidate: SubscribeValidateInterface;
  item: ItemType;
};

type FormOptionsType = {
  verifier?: ReactNode;
  itemLayout?: ReactNode;
};

export type FormStateType = {
  isEdit: boolean;
  [k: string]: any;
};

export type FormContextStoreType = {
  store: FormContextType;
  dispatch: Dispatch<FormReducerActionType>;
};

export type FormContextType = {
  form: FormType;
  options: FormOptionsType;
  state: FormStateType;
};

export enum FormActionEnum {
  Options = "options",
  State = "state",
  Form = "form",
  Update = "update",
}

type FormReducerActionType = {
  type: FormActionEnum;
  data: FormType | FormOptionsType | FormStateType | null;
};

export interface FormReducerInterface {
  (state: FormContextType, action: FormReducerActionType): FormContextType;
}

export interface useFormContextInterface {
  (): [FormStateType, (state: FormStateType) => void];
}

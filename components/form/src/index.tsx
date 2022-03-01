import { FormCore, FormList, FormItem, createFormAPI } from "./core";
import type {
  FormAPIType,
  FormCoreType,
  FormListType,
  FormItemType,
} from "./types";

const formAPI: FormAPIType = createFormAPI();

interface FormInterface extends FormCoreType {
  Item: FormItemType;
  List: FormListType;
  useForm: FormAPIType["useForm"];
  useFormContext: FormAPIType["useFormContext"];
}

const Form = FormCore as FormInterface;

Form.List = FormList;
Form.Item = FormItem;
Form.useForm = formAPI.useForm;
Form.useFormContext = formAPI.useFormContext;

const useForm: FormAPIType["useForm"] = formAPI.useForm;

const useFormContext: FormAPIType["useFormContext"] = formAPI.useFormContext;

export { useForm, useFormContext };

export default Form;

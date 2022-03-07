import { FormCore, FormList, FormItem, createFormAPI } from "./core";
import type {
  FormAPIType,
  FormCoreType,
  FormListType,
  FormItemType,
} from "./types";

export * from "./types";

const formAPI: FormAPIType = createFormAPI();

interface FormInterface extends FormCoreType {
  Item: FormItemType;
  List: FormListType;
  useForm: FormAPIType["useForm"];
}

const Form = FormCore as FormInterface;

Form.List = FormList;
Form.Item = FormItem;
Form.useForm = formAPI.useForm;

const useForm: FormAPIType["useForm"] = formAPI.useForm;

export { useForm };

export default Form;

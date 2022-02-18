import FormCore from "./core";
import Item from "./core/item";
import List from "./core/list";
import create from "./core/api";
import type { CreateType } from "./types";

const createCenerator: CreateType = create();

type FormType = typeof FormCore;

interface FormInterface extends FormType {
  Item: typeof Item;
  List: typeof List;
  useForm: typeof createCenerator.useForm;
  useFormContext: typeof createCenerator.useFormContext;
}

const Form = FormCore as FormInterface;

Form.List = List;
Form.Item = Item;
Form.useForm = createCenerator.useForm;
Form.useFormContext = createCenerator.useFormContext;

const FormItem: typeof Item = Item;

const useForm: typeof createCenerator.useForm = createCenerator.useForm;

const useFormContext: typeof createCenerator.useFormContext =
  createCenerator.useFormContext;

export { FormItem, useForm, useFormContext };

export default Form;

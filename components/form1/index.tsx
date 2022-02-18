import Core from "./core";
import Item from "./core/item";
import List from "./core/list";
import create from "./core/api";

const { useForm, useFormContext } = create();

type FormType = typeof Core;

interface FormInterface extends FormType {
  Item: typeof Item;
  List: typeof List;
  useForm: typeof useForm;
  useFormContext: typeof useFormContext;
}

const Form = Core as FormInterface;

Form.List = List;
Form.Item = Item;
Form.useForm = useForm;
Form.useFormContext = useFormContext;

export { Item as FormItem, useForm, useFormContext };

export default Form;

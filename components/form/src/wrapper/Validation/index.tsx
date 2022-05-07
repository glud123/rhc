import React, { FC, useState, useEffect } from "react";
import type {
  FormInstanceType,
  FieldNamePath,
  ValidateInfoType,
} from "../../types";
import "./index.css";

interface WrapperValidationProps {
  form: FormInstanceType;
  disabled?: boolean;
  rules?: (
    value: any,
    name: FieldNamePath,
    allValues: any
  ) => Promise<ValidateInfoType>;
  [k: string]: any;
}

const WrapperValidation: FC<WrapperValidationProps> = (props) => {
  const { children, form, disabled, rules } = props;

  let namePath = form.getFieldName();

  const [state, setState] = useState({
    isValid: true,
    message: "",
  });

  let listener;

  if (rules && rules.length > 0) {
    listener = (value: any, name: FieldNamePath, allValues: any) => {
      return rules(value, name, allValues)
        .then(() => {
          setState({
            isValid: true,
            message: "",
          });
          return Promise.resolve(undefined);
        })
        .catch((e) => {
          setState({
            isValid: false,
            message: e.message,
          });
          return Promise.reject({ field: namePath, message: e.message });
        });
    };
  }

  form.subscribeValidate(
    {
      paths: [namePath],
      listener,
    },
    [rules]
  );

  form.subscribe(
    {
      fieldsName: [namePath],
      listener: () => {
        form.validate([namePath]);
      },
    },
    [rules]
  );

  useEffect(() => {
    setState({
      isValid: disabled ? true : state.message === "",
      message: state.message,
    });
  }, [disabled]);

  const { isValid, message } = state;

  return (
    <div className="validate-container">
      <div className={`validate-content ${!isValid ? "validate-error" : ""}`}>
        {children}
      </div>
      <div
        className="validate-msg"
        style={{ visibility: isValid ? "hidden" : "visible" }}
      >
        {message}
      </div>
    </div>
  );
};

export default WrapperValidation;

export type WrapperValidationType = typeof WrapperValidation;

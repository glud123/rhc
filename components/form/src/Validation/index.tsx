import React, { FC, useCallback, useState } from "react";
import type { FormType, NamePath, NamePathType } from "../types";
import "./index.css";

interface ValidationProps {
  form: FormType;
  name: NamePathType;
  rules: (value: any, allValues: any) => Promise<any>;
  onChange?: any;
  [k: string]: any;
}

const Validation: FC<ValidationProps> = (props) => {
  const { children, form, name, onChange, rules, ...rest } = props;

  let namePath = form.item.getName() as NamePath;

  const [state, setState] = useState({
    isValid: true,
    message: "",
  });

  const listener = useCallback(
    (value: any, allValues: any) => {
      return rules(value, allValues)
        .then(() => {
          setState({
            isValid: true,
            message: "",
          });
          return Promise.resolve();
        })
        .catch((e) => {
          setState({
            isValid: false,
            message: e.message,
          });
          return Promise.reject({ field: name, message: e.message });
        });
    },
    [rules]
  );

  form.subscribeValidate({
    paths: [namePath],
    listener: listener,
  });

  const handleChange = (v: any) => {
    onChange && onChange(v);
    form.validate([namePath]);
  };

  const { isValid, message } = state;

  return (
    <div className="verification_container">
      <div
        className={`verification_content ${
          !isValid && "verification_content_error"
        }`}
      >
        {React.cloneElement(children as React.ReactElement, {
          onChange: handleChange,
          ...rest,
        })}
      </div>
      {!isValid && <div className="verification_error">{message}</div>}
    </div>
  );
};

export default Validation;
export type ValidationType = typeof Validation;

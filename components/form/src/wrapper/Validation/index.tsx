import React, { FC, useCallback, useState } from "react";
import type { FormInstanceType, NamePath } from "../../types";
import "./index.css";

interface WrapperValidationProps {
  form: FormInstanceType;
  name: NamePath;
  rules: (value: any, allValues: any) => Promise<any>;
  onChange?: any;
  [k: string]: any;
}

const WrapperValidation: FC<WrapperValidationProps> = (props) => {
  const { children, form, name, onChange, rules, ...rest } = props;

  let namePath = form.getFieldName();

  const [state, setState] = useState({
    isValid: true,
    message: "",
  });

  form.subscribeValidate({
    paths: [namePath],
    listener: (value: any, allValues: any) => {
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
          return Promise.reject({ field: namePath, message: e.message });
        });
    },
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

export default WrapperValidation;

export type WrapperValidationType = typeof WrapperValidation;

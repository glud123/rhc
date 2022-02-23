import React, { FC } from "react";

export type OptionItem = {
  label: string;
  value: string | number;
  [k: string]: any;
};

interface SelectProps {
  value?: string;
  onChange?: (v: string) => void;
  options?: OptionItem[];
  placeholder?: string;
}

const Select: FC<SelectProps> = (props) => {
  const { value = "", onChange, options, placeholder } = props;
  const handleChange = (e: { target: { value: string } }) => {
    onChange && onChange(e.target.value);
  };
  return (
    <select
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      style={{ width: "147px" }}
    >
      {(options || []).map((item) => {
        return (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;

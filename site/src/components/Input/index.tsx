import React, { FC } from "react";

interface InputProps {
  value?: string;
  onChange?: (v: string) => void;
  type?: "text" | "number";
  placeholder?: string;
}

const Input: FC<InputProps> = (props) => {
  const { value = "", onChange, type = "text", placeholder } = props;
  const handleChange = (e: { target: { value: string } }) => {
    onChange && onChange(e.target.value);
  };
  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default Input;

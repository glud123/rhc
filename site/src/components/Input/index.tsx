import React, { FC } from "react";
import { createUseStyles } from "react-jss";

interface InputProps {
  value?: string;
  onChange?: (v: string) => void;
  type?: "text" | "number";
  placeholder?: string;
  disabled?: boolean;
}

const Input: FC<InputProps> = (props) => {
  const { value = "", onChange, type = "text", placeholder, disabled } = props;

  const styles = useStyles();

  const handleChange = (e: { target: { value: string } }) => {
    onChange && onChange(e.target.value);
  };

  return (
    <input
      disabled={disabled}
      className={styles.input}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default Input;

const useStyles = createUseStyles({
  input: {
    width: "100%",
    padding: "6px 10px",
    borderRadius: "4px",
    boxSizing: "border-box",
    borderStyle: "solid",
    borderWidth: "1px",
    transition: "all 0.3s ease-in-out",
  },
});

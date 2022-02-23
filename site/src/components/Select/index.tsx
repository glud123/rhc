import React, { FC } from "react";
import { createUseStyles } from "react-jss";

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
  const {
    value = "",
    onChange,
    options: propsOptions = [],
    placeholder = "请选择...",
  } = props;

  const styles = useStyles();

  const handleChange = (e: { target: { value: string } }) => {
    onChange && onChange(e.target.value);
  };

  let options = [{ label: placeholder, value: "" }, ...propsOptions];

  return (
    <select
      className={styles.select}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    >
      {options.map((item) => {
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

const useStyles = createUseStyles({
  select: {
    width: "100%",
    padding: "6px 10px",
    borderRadius: "4px",
    boxSizing: "border-box",
    borderStyle: "solid",
    borderWidth: "1px",
    transition: "all 0.3s ease-in-out",
  },
});

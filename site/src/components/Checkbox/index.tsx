import React, { FC } from "react";
import { createUseStyles } from "react-jss";

interface CheckboxProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { value = false, onChange } = props;
  const styles = useStyles();

  const handleChange = (e: any) => {
    onChange?.(e.target.checked);
  };

  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={value}
      onChange={handleChange}
    />
  );
};

export default Checkbox;

const useStyles = createUseStyles({
  checkbox: {
    width: 20,
    height: 20,
    appearance: "none",
    backgroundColor: "#bf1650",
    border: "1px solid #bf1650",
    borderRadius: 2,
    cursor: "pointer",
    "&:checked": {
      backgroundColor: "#fff",
      border: "1px solid #fff",
    },
  },
});

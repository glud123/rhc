import React, { FC } from "react";
import { createUseStyles } from "react-jss";

interface ButtonProps {
  type?: "primary" | "secondary" | "default";
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
}

const Button: FC<ButtonProps> = (props) => {
  const { style, children, type = "default" } = props;
  const styles = useStyles();

  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      style={style}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;

const useStyles = createUseStyles({
  button: {
    border: "none",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "4px",
    color: "#fff",
    padding: "16px 10px",
    width: "100%",
  },
  default: {
    borderColor: "#2f3856",
    backgroundColor: "#0e101c",
    "&:hover": {
      borderColor: "#bf1650",
    },
  },
  primary: {
    letterSpacing: "0.5rem",
    borderColor: "#ec5990",
    backgroundColor: "#ec5990",
    "&:hover": {
      backgroundColor: "#bf1650",
    },
  },
  secondary: {
    letterSpacing: "0.5rem",
    borderColor: "#ec5990",
    backgroundColor: "#000000",
    "&:hover": {
      backgroundColor: "#0e101c",
    },
  },
});

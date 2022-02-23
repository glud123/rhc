import React, { FC } from "react";
import { createUseStyles } from "react-jss";

interface ButtonProps {
  type?: "primary" | "secondary" | "default";
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { style, children, onClick, type = "default" } = props;
  const styles = useStyles();

  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      style={style}
      type="button"
      onClick={onClick}
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
    padding: "10px 16px",
    width: "100%",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    textTransform: "uppercase",
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
      borderColor: "#bf1650",
      backgroundColor: "#0e101c",
    },
  },
});

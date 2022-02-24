import React, { FC } from "react";
import { createUseStyles } from "react-jss";

interface CardProps {
  title: string;
}

const Card: FC<CardProps> = (props) => {
  const { title, children } = props;
  const styles = useStyles();
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span>{title}</span>
      </div>
      <div className={styles.bottom}>{children}</div>
    </div>
  );
};

export default Card;

const useStyles = createUseStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  top: {
    width: "100%",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    "&::before": {
      display: "block",
      flex: 1,
      content: '""',
      backgroundColor: "#526290",
      height: "1px",
    },
    "&::after": {
      display: "block",
      content: '""',
      flex: 1,
      height: "1px",
      backgroundColor: "#526290",
    },
    "& span": {
      color: "#fff",
      fontSize: "24px",
    },
  },
  bottom: {},
});

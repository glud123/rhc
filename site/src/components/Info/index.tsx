import React, { FC } from "react";
import { createUseStyles } from "react-jss";

const Info: FC = (props) => {
  const { children } = props;
  const styles = useStyles();
  return <div className={styles.info}>ⓘ {children}</div>;
};

export default Info;

const useStyles = createUseStyles({
  info: {
    fontSize: ".9rem",
    lineHeight: 1.5,
  },
});

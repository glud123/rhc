import React, { FC } from "react";
import { createUseStyles } from "react-jss";

interface GroupProps {}

const Group: FC = (props) => {
  const { children } = props;
  const styles = useStyles();

  return (
    <ul className={styles.group}>
      {React.Children.map(children, (child) => {
        return <li>{child}</li>;
      })}
    </ul>
  );
};

export default Group;

const useStyles = createUseStyles({
  group: {
    display: "flex",
    gap: "32px",
    padding: "0px",
    "& li": {
      flex: 1,
      listStyle: "none",
    },
  },
});

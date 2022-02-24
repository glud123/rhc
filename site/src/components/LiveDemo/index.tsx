import React from "react";
import { createUseStyles } from "react-jss";
import Card from "@/components/Card";
import Example from "./Example";
import Watch from "./Watch";
import Errors from "./Errors";
import Submit from "./Submit";

const LiveDemo = () => {
  const styles = useStyles();
  return (
    <ul className={styles.live_demo}>
      <li>
        <Card title="Example">
          <Example />
        </Card>
      </li>
      <li>
        <Card title="Watch">
          <Watch />
        </Card>
      </li>
      <li>
        <Card title="Errors">
          <Errors />
        </Card>
      </li>
      <li>
        <Card title="Submit">
          <Submit />
        </Card>
      </li>
    </ul>
  );
};

export default LiveDemo;

const useStyles = createUseStyles({
  live_demo: {
    display: "flex",
    gap: "32px",
    "& li": {
      listStyle: "none",
    },
  },
});

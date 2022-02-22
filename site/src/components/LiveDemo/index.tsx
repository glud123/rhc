import React from "react";
import { createUseStyles } from "react-jss";
import Form from "@rhc/form";
import Card from "@/components/Card";
import Example from "./Example";

const LiveDemo = () => {
  const styles = useStyles();
  return (
    <ul className={styles.live_demo}>
      <li>
        <Card title="Example">
          <Example />
        </Card>
      </li>
    </ul>
  );
};

export default LiveDemo;

const useStyles = createUseStyles({
  live_demo: {
    display: "flex",
    "& li": {
      listStyle: "none",
    },
  },
});

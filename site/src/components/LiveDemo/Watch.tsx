import React from "react";
import { createUseStyles } from "react-jss";
import Form, { useForm } from "@rhc/form";
import Info from "@/components/Info";

const Watch = () => {
  const styles = useStyles();
  const form = useForm("live-demo");

  form.subscribe();

  let formValue = form.get();

  return (
    <div className={styles.watch}>
      <Info>更改输入值以监听值的变化</Info>
      <pre className={styles.pre}>{JSON.stringify(formValue, null, 2)}</pre>
    </div>
  );
};

export default Watch;

const useStyles = createUseStyles({
  watch: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  pre: {
    lineHeight: 1.6,
    padding: "0 20px",
    whiteSpace: "pre-wrap",
  },
});

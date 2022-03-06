import React from "react";
import { createUseStyles } from "react-jss";
import Form, { useForm } from "@rhc/form";
import Info from "@/components/Info";

const Errors = () => {
  const styles = useStyles();
  const form = useForm("live-demo");

  form.subscribeStore({ name: "formErr" });

  let formErr = form.getStore("formErr");

  return (
    <div className={styles.errors}>
      <Info>表单校验失败时将在这里显示失败信息</Info>
      <pre className={styles.pre}>{JSON.stringify(formErr, null, 2)}</pre>
    </div>
  );
};

export default Errors;

const useStyles = createUseStyles({
  errors: {
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

import React from "react";
import { createUseStyles } from "react-jss";
import Form, { useForm } from "@rhc/form";
import Info from "@/components/Info";
import Card from "@/components/Card";

const Submit = () => {
  const styles = useStyles();
  const form = useForm("live-demo");

  form.subscribeStore({ name: "values" });

  let values = form.getStore("values");

  if (!values) return null;

  return (
    <Card title="Submit">
      <div className={styles.submit}>
        <Info>点击【提交】按钮后的数据将在这里显示</Info>
        <pre className={styles.pre}>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </Card>
  );
};

export default Submit;

const useStyles = createUseStyles({
  submit: {
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

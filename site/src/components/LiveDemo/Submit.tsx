import React from "react";
import { createUseStyles } from "react-jss";
import Form, { useForm } from "@rhc/form";
import Info from "@/components/Info";

const Submit = () => {
  const styles = useStyles();
  const form = useForm("live-demo");

  return (
    <div className={styles.submit}>
      <Info>点击【提交】按钮后的数据将在这里显示</Info>
      <pre className={styles.pre}>{JSON.stringify({}, null, 2)}</pre>
    </div>
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

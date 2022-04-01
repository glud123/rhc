import React from "react";
import { createUseStyles } from "react-jss";

const Preview = () => {
  const styles = useStyles();
  return (
    <div className={styles.preview}>
      <iframe
        src="https://codesandbox.io/embed/rhc-form-demo-3ufj7m?codemirror=1&fontsize=14&hidenavigation=1&theme=dark&view=preview"
        style={{
          width: "80%",
          height: "550px",
          border: 0,
          boxShadow: "0 0 20px #010817",
          borderRadius: "4px",
          overflow: "hidden",
        }}
        title="@rhc/form demo"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
};

export default Preview;

const useStyles = createUseStyles({
  preview: {
    width: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
});

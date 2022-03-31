import React, { useLayoutEffect } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import SDK from "@stackblitz/sdk";
import Button from "@/components/Button";
import Logo from "jsx:@/assets/images/logo.svg";

const Home = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    SDK.embedProjectId("rhc-form-demo-preview", "rhc-form-demo", {
      openFile: ["src/LiveDemo/index.tsx", "src/LiveDemo/Example.tsx"],
      view: "preview",
      hideDevTools: true,
      theme: "dark",
      forceEmbedLayout: true,
      hideExplorer: true,
      hideNavigation: true,
    });
    SDK.embedProjectId("rhc-form-demo-editor", "rhc-form-demo", {
      openFile: ["src/LiveDemo/index.tsx", "src/LiveDemo/Example.tsx"],
      view: "editor",
      hideDevTools: true,
      theme: "dark",
      forceEmbedLayout: true,
      // hideExplorer: true,
      hideNavigation: true,
    });
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.title}>
        <Logo />
        <span>React Hook Component</span>
      </div>
      <div className={styles.subtitle}>
        <h2>简单、易用、数据驱动</h2>
      </div>
      <div className={styles.btns}>
        <Button
          style={{ width: "140px" }}
          onClick={() => {
            navigate("components");
          }}
        >
          去瞧瞧
          <span
            style={{
              marginLeft: "6px",
            }}
          >
            👓
          </span>
        </Button>
        <Button
          style={{ width: "140px" }}
          onClick={() => {
            navigate("api");
          }}
        >
          开始使用<span className={styles.icon}>△</span>
        </Button>
      </div>
      <div id="rhc-form-demo-preview"></div>
      <div id="rhc-form-demo-editor"></div>
    </div>
  );
};

export default Home;

const useStyles = createUseStyles({
  home: {
    padding: "40px 0px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    fontSize: "55px",
  },
  subtitle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ec5990",
  },
  btns: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: "20px 0px",
  },
  icon: {
    width: "14px",
    height: "14px",
    lineHeight: "1rem",
    overflow: "hidden",
    display: "inline-block",
    transform: "rotate(-30deg)",
  },
});

import React, { FC } from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import Menu from "@/components/Menu";
import GitHub from "jsx:@/assets/images/github.svg";
import Logo from "jsx:@/assets/images/logo.svg";

interface PageLayoutProps {
  options: any[];
}

const PageLayout: FC<PageLayoutProps> = (props) => {
  const { children, options } = props;

  const styles = useStyles();
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link className={styles.home} to="/">
            <span className={styles.logo}>
              <Logo />
            </span>
            <span className={styles.title}>RHC</span>
            <span className={styles.sub}>React Hook Component</span>
          </Link>
          <div className={styles.rigth}>
            <Menu options={options} />
            <a
              className={styles.github}
              href="https://github.com/glud123/rhc"
              target="_blank"
            >
              <GitHub />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PageLayout;

const useStyles = createUseStyles({
  page: {
    position: "relative",
    paddingTop: "60px",
  },
  home: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
  },
  rigth: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  github: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontSize: "24px",
    "&:hover": {
      backgroundColor: "#3E497A",
    },
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#F1D00A",
    "&:hover": {
      color: "#fbe55f",
    },
  },
  sub: {
    fontSize: "16px",
    color: "#ccc",
    "&:hover": {
      color: "#fff",
    },
  },
  header: {
    position: "fixed",
    top: "0",
    left: "0",
    height: "60px",
    backgroundColor: "#1a1d3a",
    width: "100%",
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 24px",
  },
  content: {
    padding: "16px",
  },
});

import React, { FC } from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import Menu from "@/components/Menu";
import GitHub from "jsx:@/assets/images/github.svg";

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
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#3E497A",
    },
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#F1D00A",
  },
  sub: {
    fontSize: "16px",
    color: "#ccc",
  },
  header: {
    position: "fixed",
    top: "0",
    left: "0",
    height: "60px",
    backgroundColor: "#21325E",
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

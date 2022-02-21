import React, { FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";

interface MenuProps {
  options: any[];
}

const Menu: FC<MenuProps> = (props) => {
  const { options } = props;
  const styles = useStyles();

  const location = useLocation();

  useEffect(() => {
    let active = options.find((item) => item.path === location.pathname);
    if (active && active.name) {
      document.title = `${active.name} | React Hook Component`;
    }
  }, [location.pathname]);

  let nextOptions = options.filter((option) => {
    return !option.hidden;
  });

  return (
    <ul className={styles.menu}>
      {nextOptions.map((option: any) => {
        return (
          <li
            key={option.path}
            style={{
              backgroundColor:
                location.pathname === option.path ? "#3E497A" : "unset",
            }}
          >
            <Link to={option.path}>{option.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;

const useStyles = createUseStyles({
  menu: {
    margin: "0",
    padding: "0",
    display: "flex",
    gap: "8px",
    "& li": {
      listStyle: "none",
      "&:hover": {
        backgroundColor: "#3E497A !important",
      },
      "& a": {
        color: "#F1D00A",
        textDecoration: "none",
        height: "60px",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },
});

import React, { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";
import Card from "@/components/Card";

type MenuItem = {
  label: string;
  path: string;
  isHash?: boolean;
};

interface ListMenuProps extends ListMenuWrapperProps {}

const ListMenu: FC<ListMenuProps> = (props) => {
  const { children, position = "left", ...rest } = props;
  const styles = useStyles();
  return (
    <div
      className={styles.list_menu}
      style={{
        justifyContent: position === "left" ? "flex-end" : "flex-start",
      }}
    >
      <ListMenuWrapper {...rest} position={position} />
      <div className={styles.right}>{children}</div>
    </div>
  );
};

export default ListMenu;

interface ListMenuWrapperProps {
  options: MenuItem[];
  position?: "left" | "right";
}

const ListMenuWrapper: FC<ListMenuWrapperProps> = (props) => {
  const { options, position } = props;
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item: MenuItem) => {
    if (item.isHash) {
      window.location.href = `#${item.path}`;
    } else {
      navigate(item.path, { replace: true });
    }
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        position: "fixed",
        bottom: "10px",
        left: position === "left" ? "4%" : undefined,
        right: position === "right" ? "4%" : undefined,
      }}
    >
      <Card title="Menu" titleStyle={{ color: "#526290", fontSize: "18px" }}>
        <ul className={styles.menu}>
          {options.map((item) => {
            let active = `#${item.path}` === location.hash;
            return (
              <li
                className={`${styles.item} ${active ? styles.active : ""}`}
                key={item.path}
                onClick={() => handleClick(item)}
              >
                <span className={styles.icon}>{`</>`}</span>
                {item.label}
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

const useStyles = createUseStyles({
  list_menu: {
    width: "100%",
    display: "flex",
  },
  right: {
    width: "80%",
  },
  wrapper: {
    height: "75%",
    width: "15%",
  },
  menu: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  item: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    height: "24px",
    padding: "0 8px",
    "&:hover": {
      backgroundColor: "#ec5990",
      borderRadius: "2px",
    },
  },
  active: {
    backgroundColor: "#bf1650",
    borderRadius: "2px",
  },
  icon: {
    fontSize: "12px",
  },
});

import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";

type MenuItem = {
  label: string;
  path: string;
  isHash?: boolean;
};

interface ListMenuProps extends ListMenuWrapperProps {}

const ListMenu: FC<ListMenuProps> = (props) => {
  const { children, ...rest } = props;
  const styles = useStyles();
  return (
    <div className={styles.list_menu}>
      <ListMenuWrapper {...rest} />
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
  const { options, position = "left" } = props;
  const styles = useStyles();
  const navigate = useNavigate();

  const handleClick = (item: MenuItem) => {
    if (item.isHash) {
      window.location.href = `#${item.path}`;
    } else {
      navigate(item.path, { replace: true });
    }
  };

  return (
    <ul
      className={styles.menu}
      style={{
        position: "fixed",
        bottom: 0,
        left: position === "left" ? 0 : undefined,
        right: position === "right" ? 0 : undefined,
      }}
    >
      {options.map((item) => {
        return (
          <li
            className={styles.menu_item}
            key={item.path}
            onClick={() => handleClick(item)}
          >
            {item.label}
          </li>
        );
      })}
    </ul>
  );
};

const useStyles = createUseStyles({
  list_menu: {
    width: "100%",
    display: "flex",
  },
  right: {
    flex: 1,
  },
  menu: {
    padding: 0,
    margin: 0,
    height: "80%",
  },
  menu_item: {
    listStyle: "none",
  },
});

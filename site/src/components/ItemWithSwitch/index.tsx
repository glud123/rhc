import React, { FC, useState } from "react";
import { createUseStyles } from "react-jss";
import Checkbox from "@/components/Checkbox";

interface ItemWithSwitchProps {
  defaultValue?: boolean;
  children: JSX.Element;
  style?: React.CSSProperties;
}

const ItemWithSwitch: FC<ItemWithSwitchProps> = (props) => {
  const { defaultValue = false, children, style } = props;
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(defaultValue);

  const childProps = children?.props;

  const handleClick = (v: boolean) => {
    setOpen(v);
  };

  return (
    <div className={styles.item} style={style}>
      <Checkbox onChange={handleClick} value={open} />
      {React.cloneElement(children as JSX.Element, {
        ...childProps,
        isSubscribe: open,
      })}
    </div>
  );
};
export default ItemWithSwitch;

const useStyles = createUseStyles({
  item: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  switch: {},
});

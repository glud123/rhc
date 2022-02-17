import React, { FC } from "react";
import type { NamePathType } from "../types";
import "./index.css";

interface ItemPropsInterface {
  name: NamePathType;
  label?: string | React.ReactNode;
  require?: boolean;
}

const ItemLayout: FC<ItemPropsInterface> = (props) => {
  const { label, require = false, children } = props;

  let nextLabel = label ? (
    typeof label === "string" ? (
      <label className={require ? "label require" : "label"}>{label}</label>
    ) : (
      label
    )
  ) : null;

  return (
    <div className="form-item">
      {nextLabel}
      {children}
    </div>
  );
};

export default ItemLayout;

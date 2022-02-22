import React, { FC } from "react";
import type { NamePathType } from "../types";
import "./index.css";

interface ItemPropsInterface {
  name: NamePathType;
  label?: string | React.ReactNode;
  required?: boolean;
}

const ItemLayout: FC<ItemPropsInterface> = (props) => {
  const { label, required = false, children } = props;

  let nextLabel = label ? (
    typeof label === "string" ? (
      <label className={required ? "label required" : "label"}>{label}</label>
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

import React, { FC } from "react";
import type { NamePathType } from "../../types";
import "./index.css";

interface WrapperItemInterface {
  name: NamePathType;
  label?: string | React.ReactNode;
  required?: boolean;
}

const WrapperItem: FC<WrapperItemInterface> = (props) => {
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

export default WrapperItem;

export type WrapperItemType = typeof WrapperItem;

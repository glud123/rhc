import React, { FC } from "react";
import "./index.css";

interface WrapperItemInterface {
  label?: string | React.ReactNode;
  required?: boolean;
}

const WrapperItem: FC<WrapperItemInterface> = (props) => {
  const { label, required = false, children } = props;

  let nextLabel = label ? (
    typeof label === "string" ? (
      <span
        className={`form-item-label ${required ? "form-item-required" : ""}`}
      >
        {label}
      </span>
    ) : (
      label
    )
  ) : null;

  return (
    <label className="form-item">
      {nextLabel}
      {children}
    </label>
  );
};

export default WrapperItem;

export type WrapperItemType = typeof WrapperItem;

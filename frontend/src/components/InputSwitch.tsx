import clsx from "clsx";
import React, {  InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement>;

export const InputSwitch = React.forwardRef(
  ({className, ...props }: Props, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <label className={clsx("switch " + className)}>
        <input ref={ref} {...props} type="checkbox" />
        <span className="slider round"></span>
      </label>
    );
  }
);

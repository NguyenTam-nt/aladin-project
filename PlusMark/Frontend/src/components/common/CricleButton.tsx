import NextIcon from "@assets/iconElements/NextIcon";
import clsx from "clsx";
import React, { ButtonHTMLAttributes, ReactNode, memo } from "react";

interface CricleBtnProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  className?: string;
  ref?: any;
}

const CricleButton = memo(
  React.forwardRef(({ ref, icon, className, ...props }: CricleBtnProp) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          "w-12 h-12 rounded-full flex items-center justify-center border border-aqua-aq02 ",
          className
        )}
      >
        {icon ? icon : <NextIcon />}
      </button>
    );
  })
);

export default CricleButton;

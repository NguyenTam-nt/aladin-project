import NextIcon from "@assets/iconElements/NextIcon";
import useI18n from "@hooks/useI18n";
import clsx from "clsx";
import React, { ButtonHTMLAttributes, ReactNode, memo } from "react";

interface CricleBtnProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  iconLeft?: ReactNode;
  className?: string;
  ref?: any;
  gradien?: boolean;
  normal?: boolean;
  text: string;
}

const DynamicButton = memo(
  React.forwardRef(
    ({
      ref,
      icon,
      iconLeft,
      className,
      gradien = false,
      normal = true,
      text,
      ...props
    }: CricleBtnProp) => {
      const { t } = useI18n();
      return (
        <button
          ref={ref}
          {...props}
          className={clsx(
            "rounded-full flex items-center text-base justify-center gap-1 min-h-[32px] min-w-[136px]",
            {
              "bg-btn text-white": gradien,
              "border border-aqua-aq02 bg-transparent text-aqua-aq02": normal,
            },
            className
          )}
        >
          {iconLeft}
          {t(text || "")}
          {icon}
        </button>
      );
    }
  )
);

export default DynamicButton;
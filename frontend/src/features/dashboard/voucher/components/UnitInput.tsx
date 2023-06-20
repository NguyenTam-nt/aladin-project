import clsx from "clsx";
import React, { useContext, InputHTMLAttributes, memo } from "react";
import { useTranslation } from "react-i18next";
type Props = {
  withIndicator?: boolean;
  IconComponent?: React.ReactNode;
  renderRight?: () => React.ReactElement;
  renderLeft?: () => React.ReactElement;
} & InputHTMLAttributes<HTMLInputElement>;

export const UnitInput = ({className, value, placeholder, unit, ...props}: any) => {
    const { t } = useTranslation();
    return (
      <div
        className={clsx(
          "h-[48px] placeholder:text-text_A1A0A3 placeholder:text-_14 w-full flex items-center py-[13px] px-[16px] border-[1px] border-solid border-text_A1A0A3 focus-within:!border-TrueBlue_500 " +
            className
        )}
      >
        <input
          autoComplete="off"
          value={value}
          {...props}
          className="flex-1 h-full outline-none bg-transparent"
          placeholder={t(placeholder) || ""}
        />
        {unit && (
          <div className="text-text_A1A0A3  flex items-center text-_14 pl-4 border-l border-l-text_A1A0A3 h-[70%]">
            {unit}
          </div>
        )}
      </div>
    );
}

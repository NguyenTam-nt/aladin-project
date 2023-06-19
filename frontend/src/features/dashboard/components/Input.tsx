import clsx from "clsx";
import React, { useContext, InputHTMLAttributes, memo } from "react";
import { useTranslation } from "react-i18next";
type Props = {
  withIndicator?: boolean;
  IconComponent?: React.ReactNode;
  renderRight?: () => React.ReactElement;
  renderLeft?: () => React.ReactElement;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = memo(
  React.forwardRef(
    (
      {
        withIndicator,
        IconComponent,
        placeholder = "",
        renderRight,
        renderLeft,
        className,
        value,
        maxLength,
        ...props
      }: Props,
      ref: React.LegacyRef<HTMLInputElement>
    ) => {
      const { t } = useTranslation();
      return (
        <div
          className={clsx(
            "h-[48px] placeholder:text-text_A1A0A3 placeholder:text-_14 w-full flex items-center py-[13px] px-[16px] border-[1px] border-solid border-text_A1A0A3 focus-within:!border-TrueBlue_500 " +
              className
          )}
        >
          <input
            ref={ref}
            autoComplete="off"
            value={value}
            maxLength={maxLength}
            {...props}
            className="flex-1 h-full outline-none bg-transparent"
            placeholder={t(placeholder) || ""}
          />
          {maxLength && (
            <div className="text-text_A1A0A3  flex items-center text-_14">
              <span>{value?.toString().length || 0}</span>/{maxLength}
            </div>
          )}
        </div>
      );
    }
  )
);

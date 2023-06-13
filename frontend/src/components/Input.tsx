import clsx from "clsx";
import React, { useContext, InputHTMLAttributes, memo } from "react";
import { useTranslation } from "react-i18next";
type Props = {
  withIndicator?: boolean;
  IconComponent?: React.ReactNode;
  renderRight?: () => React.ReactElement;
  renderLeft?: () => React.ReactElement;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = memo(React.forwardRef(
  (
    {
      withIndicator,
      IconComponent,
      placeholder = "",
      renderRight,
      renderLeft,
      className,
      ...props
    }: Props,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    
    const { t } = useTranslation()
    return (
      <div
        className={clsx(
          (className =
            "h-[48px] placeholder:text-text_A1A0A3 placeholder:text-_14 w-full rounded-[16px_0_16px_0] flex items-center py-[13px] px-[16px] border-[1px] border-solid border-br_E6E6E6 focus-within:border-primary " +
            className)
        )}
      >
        {renderLeft ? renderLeft?.() : null}
        <input
          ref={ref}
          autoComplete="off"
          {...props}
          className="flex-1 h-full outline-none bg-transparent"
          placeholder={t(placeholder) || ""}
        />
        {renderRight ? renderRight?.() : null}
      </div>
    );
  }
))

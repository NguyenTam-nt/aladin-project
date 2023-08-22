import clsx from "clsx";
import React, {
  useContext,
  InputHTMLAttributes,
  memo,
  ChangeEvent,
} from "react";
import { useTranslation } from "react-i18next";

type Props = {
  withIndicator?: boolean;
  IconComponent?: React.ReactNode;
  renderRight?: () => React.ReactElement;
  renderLeft?: () => React.ReactElement;
  icon?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputComponent = memo(
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
        icon,
        type = "text",
        ...props
      }: Props,
      ref: React.LegacyRef<HTMLInputElement>
    ) => {
      const { t } = useTranslation();
      return (
        <div
          className={clsx(
            "h-[48px] placeholder:text-black02 placeholder:text-_14 w-full flex items-center py-[13px] px-4 border-[1px] border-solid border-gray-_A1A0A3 focus-within:!border-TrueBlue_500 " +
            className
          )}
        >
          {renderLeft ? renderLeft() : null}
          <input
            type={type}
            ref={ref}
            autoComplete="off"
            value={value}
            maxLength={maxLength}
            {...props}
            className="flex-1 h-full outline-none bg-transparent text-black02"
            placeholder={t(placeholder) || ""}
          />
        </div>
      );
    }
  )
);

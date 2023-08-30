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
  rounded?: boolean;
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
        rounded = true,
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
            "h-[40px] placeholder:text-neutra-neutral60 placeholder:text-wap-regular2 w-full flex items-center py-[13px] px-[13px] border-[1px] border-solid border-neutra-neutra80",
            { "rounded-[50px]": rounded },
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
            className="flex-1 h-full bg-transparent text-black-bl0 font-normal text-wap-regular2"
            placeholder={t(placeholder) || ""}
          />
        </div>
      );
    }
  )
);

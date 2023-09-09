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
  unit?: any;
  rounded?: boolean;
  showMaxLangth?: boolean;
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
        showMaxLangth = false,
        icon,
        type = "text",
        unit,
        ...props
      }: Props,
      ref: React.LegacyRef<HTMLInputElement>
    ) => {
      const { t } = useTranslation();
      return (
        <div
          className={clsx(
            " placeholder:text-neutra-neutral60 placeholder:text-wap-regular2 w-full flex items-center border-[1px] border-solid border-neutra-neutra80",
            { "h-[40px] rounded-[50px]": rounded, "h-12": !rounded },
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
            className="flex-1 h-full bg-transparent text-black-bl0 font-normal text-wap-regular2 py-[13px] px-[13px]"
            placeholder={t(placeholder) || ""}
          />
          {(showMaxLangth && maxLength) && (
            <div className="text-grey-A1A0A3 text-wap-regular2 flex items-center mr-4">
              <span>{value?.toString().length || 0}</span>/{maxLength}
            </div>
          )}
          {unit && (<div className={clsx('py-[13px]')}><p className="pl-[10px] pr-4 border-l-[1px] border-neutra-neutra80 font-normal text-wap-regular2 ">{unit}</p></div>)}
          {renderRight ? renderRight() : null}
        </div>
      );
    }
  )
);

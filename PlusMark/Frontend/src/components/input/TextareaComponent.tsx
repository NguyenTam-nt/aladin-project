import clsx from "clsx";
import React, { TextareaHTMLAttributes, memo } from "react";
import { useTranslation } from "react-i18next";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextareaComponent = memo(
  ({ placeholder, className, maxLength, value, ...props }: Props) => {
    const { t } = useTranslation();
    return (
      <div
        className={clsx(
          'h-[90px] placeholder:text-neutra-neutral60 placeholder:text-wap-regular2 w-full flex items-center py-[13px] px-[13px] border-[1px] border-solid border-neutra-neutra80 rounded-[20px]',
          className
        )}
      >
        <textarea
          autoComplete="off"
          value={value}
          maxLength={maxLength}
          {...props}
          className="flex-1 h-full bg-transparent text-black-bl0 font-normal text-wap-regular2"
          placeholder={t(placeholder || "") || ""}
        />
        {maxLength && (
          <div className="text-gray-_A1A0A3 self-start flex items-center text-_14">
            <span>{value?.toString().length || 0}</span>/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

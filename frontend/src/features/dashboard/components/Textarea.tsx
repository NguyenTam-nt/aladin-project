import clsx from "clsx";
import React, { TextareaHTMLAttributes, memo } from "react";
import { useTranslation } from "react-i18next";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = memo(
  ({ placeholder, className, maxLength, value, ...props }: Props) => {
    const { t } = useTranslation();
    return (
      <div
        className={clsx(
          "h-[48px] placeholder:text-text_A1A0A3 placeholder:text-_14 min-h-[96px] max-h-[200px] w-full flex items-center py-[13px] px-[16px] border-[1px] border-solid border-text_A1A0A3 focus-within:border-TrueBlue_500 " +
            className
        )}
      >
        <textarea
          autoComplete="off"
          value={value}
          maxLength={maxLength}
          {...props}
          className="flex-1 h-full resize-none outline-none bg-transparent"
          placeholder={t(placeholder || "") || ""}
        />
        {maxLength && (
          <div className="text-text_A1A0A3 self-start flex items-center text-_14">
            <span>{value?.toString().length || 0}</span>/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

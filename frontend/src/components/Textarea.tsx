import clsx from "clsx";
import React, { TextareaHTMLAttributes, memo } from "react";
import { useTranslation } from "react-i18next";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = memo(({ placeholder, className, ...props }: Props) => {
  const {t} = useTranslation()
  return (
    <textarea
      placeholder={t(placeholder || "") || ""}
      {...props}
      className={clsx(
        "h-auto placeholder:text-text_A1A0A3 rounded-[16px_0_16px_0] min-h-[144px] py-[13px] px-[16px] border-br_E6E6E6  w-full resize-none overflow-hidden border  focus:border-primary " +
          className
      )}
    />
  );
})

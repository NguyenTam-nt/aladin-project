import { TranslateContext } from "@contexts/Translation";
import clsx from "clsx";
import React, { TextareaHTMLAttributes, useContext } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const InputMultiLine = ({ placeholder, className, ...props }: Props) => {
  const { t } = useContext(TranslateContext);
  return (
    <textarea
      placeholder={t(placeholder)}
      {...props}
      className={clsx(
        "h-auto min-h-[120px] py-[8px] px-[16px] w-full resize-none overflow-hidden border border-br_E9ECEF " +
          className
      )}
    />
  );
};

import clsx from "clsx";
import React, { ButtonHTMLAttributes, memo, useContext } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  size?: number;
  color: "primary" | "empty" ;
  text: string;
  image?: React.ReactNode
  imageLeft?:  React.ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo(({ size = 14, color = "primary", text, image, className, imageLeft, ...props }: Props) => {
  const { t } = useTranslation()

  return (
    <button
    type="button"
      {...props}
      className={clsx("relative h-[48px] px-[12px] text-_14  w-full font-bold overflow-hidden btn-4 hover:opacity-80 flex justify-center items-center " + className, {
        "bg-TrueBlue_500 text-text_white": color === "primary",
        "bg-transparent text-TrueBlue_500 border border-TrueBlue_500": color === "empty",
        "justify-between": image
      })}
    >
      {imageLeft ? imageLeft : null}
      {t(text)}
      {image ? image : null}
    </button>
  );
})

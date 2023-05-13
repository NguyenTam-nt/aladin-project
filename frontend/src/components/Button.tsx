import { TranslateContext } from "@contexts/Translation";
import clsx from "clsx";
import React, { ButtonHTMLAttributes, useContext } from "react";

type Props = {
  size?: number;
  color: "primary" | "empty";
  text: string;
  image?: React.ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ size = 14, color = "primary", text, image, className, ...props }: Props) => {
  const { t } = useContext(TranslateContext);

  return (
    <button
      {...props}
      className={clsx("relative h-[40px] px-[16px] text-_14 xl:text-_16 w-full font-bold overflow-hidden btn-4 flex items-center", {
        "bg-primary text-text_white": color === "primary",
        "bg-text_white text-secondary": color === "empty",
        "justify-between": image
      }, className)}
      // style={{
      //   fontSize: `${size}px`
      // }}
    >
      {t(text)}
      {image ? image : null}
    </button>
  );
};

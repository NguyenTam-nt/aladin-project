import { TranslateContext } from "@contexts/Translation";
import clsx from "clsx";
import React, { ButtonHTMLAttributes, useContext } from "react";

type Props = {
  size?: number;
  color: "primary" | "empty";
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ size = 14, color = "primary", text, ...props }: Props) => {
  const { t } = useContext(TranslateContext);

  return (
    <button
      {...props}
      className={clsx("h-[40px] px-[16px] w-full font-bold hover:opacity-80", {
        "bg-secondary text-text_white": color === "primary",
        "bg-text_white text-secondary": color === "empty",
      })}
      style={{
        fontSize: `${size}px`
      }}
    >
      {t(text)}
    </button>
  );
};

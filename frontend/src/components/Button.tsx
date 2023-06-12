import { Colors } from "@constants/color";
import clsx from "clsx";
import React, { ButtonHTMLAttributes, Fragment, memo, useContext } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  size?: number;
  color: "primary" | "empty";
  text: string;
  image?: React.ReactNode;
  imageLeft?: React.ReactNode;
  className?: string;
  classNameParent?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo(
  ({
    size = 14,
    color = "primary",
    text,
    image,
    className,
    imageLeft,
    classNameParent,
    ...props
  }: Props) => {
    const { t } = useTranslation();

    return (
      <div
        className={clsx("btn-common w-max relative h-max " + classNameParent)}
        style={{
          ["--color-btn" as string]:
            color === "primary" ? Colors.primary : Colors.text_white,
        }}
      >
        <button
          type="button"
          {...props}
          className={clsx(
            "relative h-[48px] z-[1]  text-_14 w-full font-bold overflow-hidden rounded-[16px_0_16px_0] flex justify-center items-center btn-hover-effect btn-hover-effect--effect-3",
            {
              "bg-primary text-text_white": color === "primary",
              "bg-text_white text-primary": color === "empty",
              // "justify-between": image,
            },
            className
          )}
        >
          {imageLeft ? imageLeft : null}
          {t(text)}
          {image ? image : null}
        </button>
      </div>
    );
  }
);

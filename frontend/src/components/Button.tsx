import clsx from "clsx";
import React, { ButtonHTMLAttributes, memo, useContext } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  size?: number;
  color: "primary" | "empty";
  text: string;
  image?: React.ReactNode;
  imageLeft?: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo(
  ({
    size = 14,
    color = "primary",
    text,
    image,
    className,
    imageLeft,
    ...props
  }: Props) => {
    const { t } = useTranslation();

    return (
      <button
        type="button"
        {...props}
        className={clsx(
          "relative h-[48px] text-_14 xl:text-_16 w-full font-bold overflow-hidden rounded-[16px_0_16px_0] flex justify-center items-center",
          {
            "bg-primary text-text_white": color === "primary",
            "bg-text_white text-primary": color === "empty",
            "justify-between": image,
          },
          className
        )}
      >
        {imageLeft ? imageLeft : null}
        {t(text)}
        {image ? image : null}
      </button>
    );
  }
);

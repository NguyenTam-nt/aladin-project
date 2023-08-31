import useI18n from "@hooks/useI18n";
import React, { useEffect, useRef } from "react";

export const TextError = ({
  message,
  option,
}: {
  message: string;
  option?: { [key: string]: any };
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { t } = useI18n();
  useEffect(() => {
    if (ref.current) {
      ref.current.parentElement!.style.position = "relative";
    }
  }, []);
  return (
    <span ref={ref} className=" text-xs text-red-r03 ">
      {t(message)}
    </span>
  );
};

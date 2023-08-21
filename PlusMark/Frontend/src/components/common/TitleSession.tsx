import useI18n from "@hooks/useI18n";
import clsx from "clsx";
import React, { memo } from "react";
interface Props {
  text: string;
  className?: string;
}
const TitleSession = memo(({ text, className = "" }: Props) => {
  const { t } = useI18n();
  return (
    <h3
      className={clsx(
        "font-bold text-title leading-normal text-text-main text-left",
        className
      )}
    >
      {t(text || "")}
    </h3>
  );
});

export default TitleSession;

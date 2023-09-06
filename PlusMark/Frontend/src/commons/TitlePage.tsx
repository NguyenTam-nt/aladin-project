import useI18n from "@hooks/useI18n";
import clsx from "clsx";
import React, { memo } from "react";
interface Props {
  text: string;
  className?: string;
}
const TitlePage = memo(({ text, className }: Props) => {
  const { t } = useI18n();
  return (
    <p className={clsx("text-title font-bold text-center", className)}>
      {t(text)}
    </p>
  );
});

export default TitlePage;

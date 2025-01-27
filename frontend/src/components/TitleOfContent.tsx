import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  name: string;
  className?: string;
}
const TitleOfContent = (props: Props) => {
  const { t } = useTranslation();
  const { name, className = "" } = props;
  return (
    <h3
      className={"lg:title-48 title-24 text-secondary uppercase " + className}
    >
      {t(name)}
    </h3>
  );
};

export default TitleOfContent;

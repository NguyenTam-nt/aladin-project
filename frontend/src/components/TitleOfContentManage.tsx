import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  name: string;
  subTitle?: string;
  className?: string;
}
const TitleOfContentManage = (props: Props) => {
  const { name, subTitle, className = "" } = props;
  const { t } = useTranslation();
  return (
    <h3 className={"title-24 font-bold font-IBM_Plex_Sans " + className}>
      {t(name)}
      {subTitle && (
        <span className="inline-block ml-2 text-xs font-normal italic leading-[18px]">
          {t(subTitle)}
        </span>
      )}
    </h3>
  );
};

export default TitleOfContentManage;

import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { withResponsive } from "@constants/container";
import { TranslateContext } from "@contexts/Translation";
import useWindowResize from "@hooks/useWindowResize";
import React, { useContext } from "react";

type TitleProps = {
  title: string;
};

const NewTextOptions = ({ title }: TitleProps) => {
  const { t } = useContext(TranslateContext);
  return (
    <button className="ml-[16px] xl:ml-[24px] text-text_primary text-_14 xl:text-_18  font-semibold">
      {t(title)}
    </button>
  );
};

type Props = {
  title: string;
  listLink: {
    path: string;
    name: string;
  }[];
};

export const HeaderTitle = ({ title, listLink }: Props) => {


  
  const { t } = useContext(TranslateContext);
  const { width } = useWindowResize();
  return (
    <div className="w-rp flex flex-1 flex-row  items-center mt-[40px] xl:mt-[94px]">
      <p className="text-_24 font-semibold xl:text-_40 xl:font-bold text-text_primary mr-[24px]">
        {t(title)}
      </p>
      <div className="h-[2px]  bg-bg_7E8B99 flex-1"></div>
      {listLink
        .slice(
          0,
          width > withResponsive._1280
            ? 4
            : width > withResponsive._992
            ? 3
            : width > withResponsive._640
            ? 2
            : 1
        )
        .map((item, index) => (
          <NewTextOptions key={index} title={item.name} />
        ))}
      {listLink.length >=
      (width > withResponsive._1280
        ? 5
        : width > withResponsive._992
        ? 4
        : width > withResponsive._640
        ? 3
        : 2) ? (
        <>
          <NewTextOptions title={"common._other"} />
          <ICArrowDown />
        </>
      ) : null}
    </div>
  );
};

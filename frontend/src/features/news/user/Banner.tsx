import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import banner from "@assets/images/promotion/bannerTop.png";
interface Props {
  dataBanner: {
    name: string;
    listNavigate: {
      name: string;
      path: string;
    }[];
  };
}
const Banner = ({ dataBanner }: Props) => {
  const { name, listNavigate } = dataBanner;
  const { t } = useTranslation();
  return (
    <div className="relative max-h-[488px]">
      <img className="object-cover w-full" src={banner} alt="logo" />
      <div className="absolute bottom-[28%] left-[15%] z-20">
        <h2 className="title-32 font-normal mb-4 text-text_white">{t(name)}</h2>
        <div>
          <Link
            className="text-text_white text-base font-semibold text-center"
            to={"/"}
          >
            {t("navigation.header.home")}
          </Link>
          {listNavigate &&
            listNavigate.map((itemBreak, indexBre) => {
              return (
                <Fragment key={indexBre}>
                  <span className="mx-2 text-text_white font-semibold">/</span>
                  <Link
                    className="text-text_white text-base font-semibold text-center"
                    to={itemBreak.path}
                  >
                    {t(itemBreak.name)}
                  </Link>
                </Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Banner;

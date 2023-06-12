import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import banner from "@assets/images/promotion/bannerTop.png";
import banner2 from "@assets/images/promotion/bannerTopRes.png";
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
    <div className="relative max-h-[488px] sm:h-[488px] h-[270px] bg-bg_255_255_255_03">
      <img className="w-full h-full sm:block hidden" src={banner} alt="logo" />
      <img className="w-full h-full sm:hidden" src={banner2} alt="logo" />
      <div className="absolute w-full  bottom-[28%] z-20 lg:block hidden">
        <div className="w-rp">
          <h2 className="title-32 font-normal mb-4 text-text_white">
            {t(name)}
          </h2>
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
                    <span className="mx-2 text-text_white font-semibold">
                      /
                    </span>
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
    </div>
  );
};

export default Banner;

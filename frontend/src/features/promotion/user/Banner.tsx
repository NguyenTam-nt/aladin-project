import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import banner from "@assets/images/promotion/bannerTop.png";
const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className="relative max-h-[488px]">
      <img className="object-cover w-full" src={banner} alt="logo" />
      <div className="absolute bottom-[28%] left-[15%] z-20">
        <h2 className="title-32 font-normal mb-4 text-white">Khuyến mãi</h2>
        <div>
          <Link className="text-white text-base text-center" to={"/"}>
            {t("logo-name")}
          </Link>
          <span className="mx-2 text-white">/</span>
          <Link className="text-white text-base text-center" to={"/"}>
            {t("logo-name")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

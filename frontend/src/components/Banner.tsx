import React, { useMemo } from "react";
import banner from "@assets/images/promotion/bannerTop.png";
import { Link, useLocation } from "react-router-dom";
import { routersPublic } from "@constants/routerPublic";
import { useTranslation } from "react-i18next";
export const Banner = () => {
  const params = useLocation();
  const { t } = useTranslation();
  const rootPath = useMemo(() => {
    const query = params.pathname.split("/")[1];
    return routersPublic.find((item) => item.path === `/${query}`);
  }, [params.pathname]);

  return (
    <div className="h-[488px] w-full relative flex items-end">
      <img
        alt=""
        className=" absolute inset-0 z-[-1] h-full w-full object-cover"
        src={banner}
      />
      <div className="w-rp  mb-[140px] text-text_white">
        <h3 className="title-32  uppercase">{t(rootPath?.name || "")}</h3>
        <div className="mt-[16px] text-_16 font-semibold">
          <Link to="/">{t("navigation.header.home")}</Link>
          <span className="mx-2">/</span>
          <Link to={rootPath?.path || ""}>{t(rootPath?.name || "")}</Link>
        </div>
      </div>
    </div>
  );
};

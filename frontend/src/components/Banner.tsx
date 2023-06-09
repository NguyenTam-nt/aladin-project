import React, { useMemo, Fragment } from "react";
import banner from "@assets/images/promotion/bannerTop.png";
import { Link, useLocation } from "react-router-dom";
import { IRouter, routersPublic } from "@constants/routerPublic";
import { useTranslation } from "react-i18next";
import { prefixRootRoute } from "@constants/index";
export const Banner = () => {
  const params = useLocation();
  const { t } = useTranslation();
  const rootPath = useMemo(() => {
    const paramsList = params.pathname.split("/");
    let paths = [];
    if (paramsList.length > 1) {
      const query = params.pathname.split("/")[1];
      paths.push(
        routersPublic.find((item) => item.path === `/${query}`) as IRouter
      );
      if (paramsList.length > 2) {

        const subParm = routersPublic.find(
          (item) => item.path === `/${query}/:${prefixRootRoute.slug}`
        );
        paths.push(subParm);
      }
    }
    return paths;
  }, [params.pathname]);



  return (
    <div className="h-[488px] w-full relative flex items-end">
      <img
        alt=""
        className=" absolute inset-0 z-[-1] h-full w-full object-cover"
        src={banner}
      />
      <div className="w-rp  mb-[140px] text-text_white">
        <h3 className="title-32  uppercase">{t(rootPath?.[0]?.name || "")}</h3>
        <div className="mt-[16px] text-_16 font-semibold">
          <Link to="/">{t("navigation.header.home")}</Link>
          {rootPath.map((item, index) => {
            return (
              <Fragment key={index}>
                <span className="mx-2">/</span>
                {index === rootPath.length - 1 ? (
                  <span>{t(item?.name || "")}</span>
                ) : (
                  <Link to={item?.path || ""}>{t(item?.name || "")}</Link>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

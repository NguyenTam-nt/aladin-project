import { routersPublic } from "contants/routerPublic";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Header = () => {
    const {t} = useTranslation()
  return (
    <div className="w-full h-[120px]  bg-header_bg backdrop-blur-[4px]">
      <div className="w-rp h-full flex items-center justify-between">
        {
            routersPublic.map((item, index) => {
                return !item.isHiden ? <Link  to={item.path} key={index}>{t(item.name)}</Link> : null
            })
        }
      </div>
    </div>
  );
};

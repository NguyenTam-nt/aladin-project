import { ICLogo } from "@assets/icons";
import { ICGm } from "@assets/icons/ICGm";
import { ICLogoFrame } from "@assets/icons/ICLogoFrame";
import { routersPublic } from "@constants/routerPublic";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Header = () => {
  const { t } = useTranslation();
  useEffect(() => {
    let lastIndex = 0;
    window.addEventListener("scroll", () => {
      const header = document.getElementById("header");

      if (lastIndex < document.documentElement.scrollTop - 120) {
        header!.style.transform = `translateY(${-120}px)`;

        lastIndex = document.documentElement.scrollTop - 120;
      } else {
        header!.style.transform = `translateY(${0}px)`;
        if (lastIndex > 0) lastIndex = document.documentElement.scrollTop - 120;
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {
        lastIndex = document.documentElement.scrollTop;
      });
    };
  }, []);

  const headerData = useMemo(() => {
    return routersPublic.filter((item) => !item.isHiden);
  }, []);

  return (
    <div
      className="w-full h-[120px] bg-header_bg backdrop-blur-[4px] active-header"
      id="header"
    >
      <div className="w-rp h-full flex items-center text-_18 uppercase justify-between text-white">
        {headerData.slice(0, 3).map((item, index) => {
          return (
            <Link to={item.path} key={index}>
              {t(item.name)}
            </Link>
          );
        })}
        <Link className="flex items-center relative justify-center" to="">
          <div className="rotate-logo ">
            <ICLogoFrame />
          </div>
          <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="scale-logo scale-0">
              <ICGm />
            </div>
          </div>
        </Link>
        {headerData.slice(3).map((item, index) => {
          return (
            <Link to={item.path} key={index}>
              {t(item.name)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

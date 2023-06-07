import { ICLogo } from "@assets/icons";
import { routersPublic } from "@constants/routerPublic";
import React, { useEffect } from "react";
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
  return (
    <div
      className="w-full h-[120px] bg-header_bg backdrop-blur-[4px] active-header"
      id="header"
    >
      <div className="w-rp h-full flex items-center text-_18 uppercase justify-between text-white">
        {routersPublic.slice(0, 4).map((item, index) => {
          return !item.isHiden ? (
            <Link to={item.path} key={index}>
              {t(item.name)}
            </Link>
          ) : null;
        })}
        <Link to="">
            <ICLogo />
        </Link>
        {routersPublic.slice(4).map((item, index) => {
          return !item.isHiden ? (
            <Link to={item.path} key={index}>
              {t(item.name)}
            </Link>
          ) : null;
        })}
      </div>
    </div>
  );
};

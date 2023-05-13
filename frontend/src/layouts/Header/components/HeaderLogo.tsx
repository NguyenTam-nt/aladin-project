import React, { useContext, useEffect } from "react";
import Logo from "@assets/images/logo.jpg";
import { TranslateContext } from "@contexts/Translation";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeaderOption } from "./HeaderOption";
import { ICMenu } from "@assets/icons/ICMenu";
import { Link } from "react-router-dom";
import useWindowResize from "@hooks/useWindowResize";
import { withResponsive } from "@constants/container";

export const HeaderLogo = () => {
  const { t } = useContext(TranslateContext);
  const { width } = useWindowResize();
  useEffect(() => {
    let lastIndex = 0;
    if (width <= withResponsive._1280) {
      window.addEventListener("scroll", () => {
        const header = document.getElementById("header");

        if (lastIndex < document.documentElement.scrollTop - 88) {
          if (!header?.classList.contains("active-header")) {
            console.log("add header to active");
            header?.classList.add("active-header");
          }
          lastIndex = document.documentElement.scrollTop - 88;
        } else {
          if (header?.classList.contains("active-header")) {
            header?.classList.remove("active-header");
          }
          if (lastIndex > 0)
            lastIndex = document.documentElement.scrollTop - 88;
        }
        // if(lastIndex !== 0) {
        //   lastIndex = document.documentElement.scrollTop - 88;
        // }
      });
    }

    return () => {
      window.removeEventListener("scroll", () => {
        lastIndex = document.documentElement.scrollTop;
      });
    };
  }, [width]);

  return (
    <>
      <div className="w-rp h-[56px] xl:h-[120px] flex justify-between items-center duration-300 ease-in">
        <div className="flex items-center xl:w-[45%]">
          <Link
            to="/"
            className="block w-[27px] h-[32px] xl:w-[60px] xl:h-[72px]"
          >
            <img
              src={Logo}
              alt="logo"
              className=" w-full h-full object-cover"
            />
          </Link>
          <div className="ml-[16px] flex-1">
            {/* <h2 className="text-text_4A4A4A text-[16px] font-normal">
            {t("home.header.title")}
          </h2> */}
            <h3 className=" text-_9 xl:text-[20px] font-bold text-text_secondary">
              {t("home.header.subTitle")}
            </h3>
          </div>
        </div>
        <div className="hidden xl:block  w-[45%]">
          <HeaderNavigation />
        </div>
      </div>
      <div
        className="xl:hidden border-t-[1px] border-solid bg-text_white border-br_E9ECEF relative z-10 duration-300 ease-in"
        id="header"
      >
        <div className="flex justify-between items-center w-rp bg-text_white h-[40px]">
          <div>
            <ICMenu />
          </div>
          <HeaderOption />
        </div>
      </div>
    </>
  );
};

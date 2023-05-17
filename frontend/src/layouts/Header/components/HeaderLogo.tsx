import React, { useContext, useEffect,  useState } from "react";
import Logo from "@assets/images/logo.jpg";
import { TranslateContext } from "@contexts/Translation";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeaderOption } from "./HeaderOption";
import { ICMenu } from "@assets/icons/ICMenu";
import { Link } from "react-router-dom";
import useWindowResize from "@hooks/useWindowResize";
import { withResponsive } from "@constants/container";
import { paths } from "@constants/router";
import { SidebarNavigation } from "./SidebarNavigation";
import { HeaderCommon } from "./HeaderCommon";

export const HeaderLogo = () => {
  const { t } = useContext(TranslateContext);
  const { width } = useWindowResize();

  const [isShowSidebar, setShow] = useState(false);

  useEffect(() => {
    let lastIndex = 0;
    if (width <= withResponsive._1280) {
      window.addEventListener("scroll", () => {
        const header = document.getElementById("header");

        if (lastIndex < document.documentElement.scrollTop - 88) {
          if (!header?.classList.contains("active-header")) {
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

  useEffect(() => {
    const header = document.getElementById("main-header");
    const headersub = document.getElementById("header");
    if (isShowSidebar) {
      if (document.documentElement.scrollTop > 0) {
        if (!header?.classList.contains("active-header")) {
          header?.classList.add("active-header");
        }
      }
      if(headersub)
         headersub!.style.display = "none";
    } else {
      setTimeout(() => {
        header?.classList.remove("active-header");
        if(headersub) {
          headersub!.style.display = "block";
        }
      }, 300)
    }
  }, [isShowSidebar]);

  const handleShow = () => {
    setShow(!isShowSidebar);
  };

  return (
    <div id="main-header">
      <HeaderCommon />
      <div className="bg-white border-b-[1px] border-solid border-br_E9ECEF w-rp h-[56px] xl:h-[120px] flex justify-between items-center duration-300 ease-in">
        <div className="flex items-center xl:w-[45%]">
          <Link
            to={paths.home.prefix}
            className="block w-[27px] h-[32px] xl:w-[60px] xl:h-[72px]"
          >
            <img
              src={Logo}
              alt="logo"
              className=" w-full h-full object-cover"
            />
          </Link>
          <div className="ml-[16px] flex-1">
            <h3 className=" text-_9 xl:text-[20px] font-bold text-text_secondary">
              {t("home.header.subTitle")}
            </h3>
          </div>
        </div>
        <div className="hidden xl:block  w-[45%]">
          <HeaderNavigation />
        </div>
      </div>
      {width < withResponsive._1280 ? (
        <div
          className="xl:hidden border-t-[1px] border-solid bg-text_white border-br_E9ECEF relative z-10 duration-300 ease-in"
          id="header"
        >
          <div className="flex justify-between items-center w-rp bg-text_white h-[40px]">
            <div className=" cursor-pointer" onClick={handleShow}>
              <ICMenu />
            </div>
            <HeaderOption />
          </div>
        </div>
      ) : null}
      {width < withResponsive._1280 ? (
        <SidebarNavigation isShowSidebar={isShowSidebar} onShow={handleShow} />
      ) : null}
    </div>
  );
};

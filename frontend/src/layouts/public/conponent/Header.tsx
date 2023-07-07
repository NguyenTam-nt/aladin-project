import { ICLogo } from "@assets/icons";
import { ICGm } from "@assets/icons/ICGm";
import { ICLogoFrame } from "@assets/icons/ICLogoFrame";
import { ICMenuBar } from "@assets/icons/ICMenuBar";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { IRouter, routersPublic } from "@constants/routerPublic";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SidebarNavigation } from "./SidebarNavigation";

export const Header = () => {
  useEffect(() => {
    let lastIndex = 0;
    window.addEventListener("scroll", () => {
      const header = document.getElementById("header");
      if (header) {
        const headerbreak = windownSizeWidth > withResponsive._1024 ? 120 : 56;

        if (lastIndex < document.documentElement.scrollTop - headerbreak) {
          header!.style.transform = `translateY(${-headerbreak}px)`;

          lastIndex = document.documentElement.scrollTop - headerbreak;
        } else {
          header!.style.transform = `translateY(${0}px)`;
          if (lastIndex > 0)
            lastIndex = document.documentElement.scrollTop - headerbreak;
        }
      }
    }, { 
      passive: true 
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
      className="w-full h-[56px] lg:h-[120px] bg-header_bg backdrop-blur-[4px] active-header"
      id="header"
    >
      {windownSizeWidth > withResponsive._1024 ? (
        <HeaderPC headerData={headerData} />
      ) : (
        <HeaderMobile />
      )}
    </div>
  );
};

const HeaderPC = ({ headerData }: { headerData: IRouter[] }) => {
  const { t } = useTranslation();
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-rp h-full flex items-center text-_18 uppercase justify-between text-white">
      {headerData.slice(0, 3).map((item, index) => {
        return (
          <Link onClick={handleScrollToTop} to={item.path} key={index}>
            {t(item.name)}
          </Link>
        );
      })}
      <Link onClick={handleScrollToTop} className="flex items-center relative justify-center" to="">
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
          <Link onClick={handleScrollToTop} to={item.path} key={index}>
            {t(item.name)}
          </Link>
        );
      })}
    </div>
  );
};

const HeaderMobile = memo(() => {
  const [isShowSidebar, setShow] = useState(false);
  const handleShow = () => {
    setShow(!isShowSidebar);
  };
  return (
    <>
      <div className="w-rp flex h-full justify-between items-center">
        <Link onClick={() => setShow(false)} className="flex items-center relative justify-center" to="/">
          <div className="rotate-logo ">
            <ICLogoFrame width={34} height={31} />
          </div>
          <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="scale-logo scale-0">
              <ICGm width={27} height={12} />
            </div>
          </div>
        </Link>
        <button onClick={handleShow}>
          <ICMenuBar />
        </button>
      </div>
      {windownSizeWidth < withResponsive._1280 ? (
        <SidebarNavigation isShowSidebar={isShowSidebar} onShow={handleShow} />
      ) : null}
    </>
  );
});

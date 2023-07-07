import { ICDeleteSibar } from "@assets/icons/ICDeleteSibar";
import { routersPublic } from "@constants/routerPublic";
import clsx from "clsx";
import React, { useLayoutEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ImageNavigation from "@assets/images/bg_navigation_mobile.webp"

type propsNavigate = {
  isShowSidebar: boolean;
  onShow: () => void;
};

export const SidebarNavigation = ({ isShowSidebar, onShow }: propsNavigate) => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (isShowSidebar) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isShowSidebar]);

  const headerData = useMemo(() => {
    return routersPublic.filter((item) => !item.isHiden);
  }, []);

  return (
    <>
      <div
        className={clsx(
          "side-bar w-[100%] h-screen px-[24px] fixed top-[56px] bottom-0 left-0 right-0 bg-white z-[50] overflow-y-scroll",
          {
            "side-bar-show": isShowSidebar,
            "side-bar-hide": !isShowSidebar,
          }
        )}
      >
        <div className="flex flex-col">
          {headerData.map((item, index) => {
            return !item.isHiden ? (
              <div
                className="text-_14 flex justify-between items-center pt-[24px] uppercase text-GreyPrimary"
                key={index}
              >
                <Link onClick={onShow} className="flex-1" to={item.path}>
                  {t(item.name)}
                </Link>
                {index === 0 ? (
                  <button onClick={onShow}>
                    <ICDeleteSibar />
                  </button>
                ) : null}
              </div>
            ) : null;
          })}
        </div>
        <div className=" absolute bottom-0 right-0  pointer-events-none select-none" ><img className="w-full h-full" src={ImageNavigation} alt="" /></div>
      </div>
    </>
  );
};

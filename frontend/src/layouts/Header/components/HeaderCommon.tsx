import React from "react";
import { Logo1 } from "@assets/icons/Logo1";
import { Logo2 } from "@assets/icons/Logo2";
import { Logo3 } from "@assets/icons/Logo3";
import { HeaderOption } from "./HeaderOption";
import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";

export const HeaderCommon = () => {
  const { width } = useWindowResize();
  return (
    <div className="h-[32px] xl:h-[48px] bg-bg_A7E8ED relative">
      <div className="bg-secondary h-full w-[40%] xl:w-[55%] header-comment-clip absolute right-0 top-0 bottom-0 z-[0]" />
      <div className="w-rp flex h-full justify-between items-center relative  z-[1]">
        <div className="flex items-center">
          <div>
            <Logo1
              width={width < withResponsive._1280 ? 23 : 35}
              height={width < withResponsive._1280 ? 16 : 24}
            />
          </div>
          <div className=" ml-[4px] mr-[8px] xl:ml-[8px] xl:mr-[32px]">
            <Logo2
              width={width < withResponsive._1280 && 49}
              height={width < withResponsive._1280 && 11}
            />
          </div>
          <div>
            <Logo3
              width={width < withResponsive._1280 ? 86 : 129}
              height={width < withResponsive._1280 ? 16 : 24}
            />
          </div>
        </div>
        <div className=" hidden xl:block">
          <HeaderOption />
        </div>
      </div>
    </div>
  );
};

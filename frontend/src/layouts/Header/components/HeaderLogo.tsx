import React, { useContext } from "react";
import Logo from "@assets/images/logo.jpg";
import { TranslateContext } from "@contexts/Translation";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeaderOption } from "./HeaderOption";
import { ICMenu } from "@assets/icons/ICMenu";

export const HeaderLogo = () => {
  const { t } = useContext(TranslateContext);
  return (
    <>
      <div className="w-rp h-[56px] xl:h-[120px] flex justify-between items-center">
        <div className="flex items-center xl:w-[45%]">
          <>
            <img
              src={Logo}
              alt="logo"
              className="w-[27px] h-[32px] xl:w-auto xl:h-auto object-cover"
            />
          </>
          <div className="ml-[16px]">
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
      <div className="xl:hidden border-t-[1px] border-solid border-br_E9ECEF">
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

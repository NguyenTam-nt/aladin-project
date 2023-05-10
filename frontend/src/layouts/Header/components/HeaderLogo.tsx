import React, { useContext } from "react";
import Logo from "@assets/images/logo.jpg";
import { TranslateContext } from "@contexts/Translation";
import { HeaderNavigation } from "./HeaderNavigation";

export const HeaderLogo = () => {
  const { t } = useContext(TranslateContext);
  return (
    <div className="w-rp h-[120px] flex justify-between items-center">
      <div className="flex items-center w-[45%]">
        <>
          <img src={Logo} alt="logo" className="object-cover" />
        </>
        <div className="ml-[16px]">
          {/* <h2 className="text-text_4A4A4A text-[16px] font-normal">
            {t("home.header.title")}
          </h2> */}
          <h3 className="text-[20px] font-bold text-text_secondary">
            {t("home.header.subTitle")}
          </h3>
        </div>
      </div>
      <div className="w-[45%]">
          <HeaderNavigation />
      </div>
 
    </div>
  );
};
import React, { useContext } from "react";
import Logo from "@assets/images/logo.jpg";
import VnFlag from "@assets/images/VN.jpg";
import { TranslateContext } from "@contexts/Translation";
import { ICSearch } from "@assets/icons/ICSearch";
import { Link } from "react-router-dom";
import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { HeaderItemFlag } from "./HeaderItemFlag";

export const HeaderLogo = () => {
  const { t } = useContext(TranslateContext);
  return (
    <div className="w-rp h-[120px] flex justify-between items-center">
      <div className="flex items-center">
        <>
          <img src={Logo} alt="logo" className="object-cover" />
        </>
        <div className="ml-[16px]">
          <h2 className="text-text_4A4A4A text-[16px] font-normal">
            {t("home.header.title")}
          </h2>
          <h3 className="text-[28px] font-black text-text_blue font-[Roboto]">
            {t("home.header.subTitle")}
          </h3>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <ICSearch />
        </div>
        <div className="mx-[18px] relative menu">
          <div className="flex-center cursor-pointer">
            <HeaderItemFlag image={VnFlag} text="home.header.vnflag" />
            <div>
              <ICArrowDown />
            </div>
          </div>
          <ul className="mt-[12px] bg-white">
            <li className="flex items-center">
            <HeaderItemFlag image={VnFlag} text="home.header.enflag" />
            </li>
            <li className="flex items-center mt-[4px]">
            <HeaderItemFlag image={VnFlag} text="home.header.koflag" />
            </li>
          </ul>
        </div>
        <div className="flex">
          <Link className="text-[14px] font-normal" to="#">
            {t("home.header.signup")}
          </Link>

          <div className="w-[1px] height-[16px] bg-text_primary  mx-[8px]" />

          <Link className="text-[14px] font-bold text-secondary" to="#">
            {t("home.header.login")}
          </Link>
        </div>
      </div>
    </div>
  );
};
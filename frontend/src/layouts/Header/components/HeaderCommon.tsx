import React, { useContext, useMemo } from "react";
import { Logo1 } from "@assets/icons/Logo1";
import { Logo2 } from "@assets/icons/Logo2";
import { Logo3 } from "@assets/icons/Logo3";
import { ICSearch } from "@assets/icons/ICSearch";
import VnFlag from "@assets/images/VN.jpg";
import KoFlag from "@assets/images/korean.jpg";
import { HeaderItemFlag } from "./HeaderItemFlag";
import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { Link } from "react-router-dom";
import { Ilanguage, TranslateContext } from "@contexts/Translation";
import { Colors } from "@constants/color";

export const HeaderCommon = () => {
  const { t, isVn } = useContext(TranslateContext);

  return (
    <div className="h-[48px] bg-bg_A7E8ED relative">
      <div className="bg-secondary h-full w-[55%] header-comment-clip absolute right-0 top-0 bottom-0 z-[0]" />
      <div className="w-rp flex h-full justify-between items-center relative  z-[1]">
        <div className="flex items-center">
          <div>
            <Logo1 />
          </div>
          <div className="ml-[8px] mr-[32px]">
            <Logo2 />
          </div>
          <div>
            <Logo3 />
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <div>
              <ICSearch color={Colors.text_white} />
            </div>
            <div className="w-[1px] h-[16px] relative bg-white  mx-[24px]" />
            <div className="flex">
              {/* <Link className="text-[14px] text-white font-normal" to="#">
            {t("home.header.signup")}
          </Link> */}

              <Link className="text-[14px] font-bold text-white" to="#">
                {t("home.header.login")}
              </Link>
            </div>
            <div className="w-[1px] h-[16px] relative bg-white mx-[24px]" />
            <div className="relative menu">
              <div className="flex items-center cursor-pointer pl-2">
                {
                  <HeaderItemFlag
                    type={isVn ? Ilanguage.vi : Ilanguage.ko}
                    image={isVn ? VnFlag : KoFlag}
                    text={isVn ? "home.header.viTag" : "home.header.koTag"}
                  />
                }
                <div>
                  <ICArrowDown color={Colors.text_white} />
                </div>
              </div>
              <ul className="mt-[12px] flex items-center pl-2 bg-white border-[1px] border-solid border-br_E9ECEF">
                <li className="flex items-center mt-[4px] cursor-pointer">
                  <HeaderItemFlag
                    isWhite={false}
                    type={!isVn ? Ilanguage.vi : Ilanguage.ko}
                    image={!isVn ? VnFlag : KoFlag}
                    text={!isVn ? "home.header.viTag" : "home.header.koTag"}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

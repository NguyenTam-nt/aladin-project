import React, { useContext } from "react";
import Logo from "@assets/images/logo.jpg";
import { Ilanguage, TranslateContext } from "@contexts/Translation";
import { HeaderItemFlag } from "layouts/Header/components/HeaderItemFlag";
import VnFlag from "@assets/images/VN.jpg";
import KoFlag from "@assets/images/korean.jpg";
import { ICArrowDown } from "@assets/icons/ICArrowDown"
import { Colors } from "@constants/color";
import { ICSearch } from "@assets/icons/ICSearch";

export const HeaderAdmin = () => {
  const { t, isVn } = useContext(TranslateContext);
  return (
    <div className="h-[96px] pl-[32px] pr-[126px] py-[24px] bg-white flex justify-between items-center">
      <div className="flex items-center">
        <div>
          <img className="h-[48px] w-[41px] object-cover" src={Logo} alt="" />
        </div>
        <div className="ml-[12px] flex-1">
          <h3 className=" text-_9 xl:text-[13px] font-bold text-text_primary w-[370px]">
            {t("home.header.subTitle")}
          </h3>
        </div>
      </div>

      <div className=" flex items-center">
        <div>
            <ICSearch color={Colors.text_primary} />
        </div>
      <HeaderOptionSlash />
        <div className="relative menu">
          <div className="flex items-center cursor-pointer pl-2">
            {
              <HeaderItemFlag
                type={isVn ? Ilanguage.vi : Ilanguage.ko}
                image={isVn ? VnFlag : KoFlag}
                text={isVn ? "home.header.viTag" : "home.header.koTag"}
                isAdmin
              />
            }
            <div>
              <ICArrowDown
                color={Colors.text_primary}
              />
            </div>
          </div>
          <ul className="mt-[12px] flex items-center pl-2 bg-white border-[1px] border-solid border-br_E9ECEF z-[1]">
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
        <HeaderOptionSlash />
        <div className="flex items-center">
            <img src="https://s3-alpha-sig.figma.com/img/eebf/c417/4d4828bf76f6e54e0b85f4bae6f2fcc1?Expires=1685318400&Signature=kytYT5eiYqJxzvh5vfEObtDd72oyufGbkSasqCLQtxxZXmut4XwNWYWyqp43gAymDXDDw1tVZ3ylaLkkWDDMB54vCzGVsAGolubDGaerCu3VsXaW8Ypcxip24ybdx3NZzeh8IxYKI2fh2qS9RPUZzFTK87ptoXRa5Y31FYDcug9iFLEqwqa-Zd74qb5OLh~PKRveP99ZR430RZTKEoPSrprIswNZIMbdfkKY8qQpyvDL40-qrp3H9GGsk7q3RBxvZEypztJy89qf4x7AajpBqLLq5OMQ2Z6R0PV3kQ4qCajYR97-54LBQcJZV00kPgYqW2uH0uAuibS7ivrYkb4SFg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="w-[40px] h-[40px] rounded-[50%] object-cover" />
            <span className="text-_14 text-text_primary mx-2">Admin</span>
            <div>
              <ICArrowDown
                color={Colors.text_primary}
              />
            </div>
        </div>
      </div>
    </div>
  );
};

const HeaderOptionSlash = () => {
    return <div className="w-[1px] h-[16px] hidden xl:block relative bg-primary mx-[24px]" />
}
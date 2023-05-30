import React, { useContext } from "react";
import Logo from "@assets/images/logo.jpg";
import { Ilanguage, TranslateContext } from "@contexts/Translation";
import { HeaderItemFlag } from "layouts/Header/components/HeaderItemFlag";
import VnFlag from "@assets/images/VN.jpg";
import KoFlag from "@assets/images/korean.jpg";
import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { Colors } from "@constants/color";
import { Link } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import { Avatar } from "@components/Avatar";

export const HeaderAdmin = () => {
  const { t, isVn } = useContext(TranslateContext);
  const {user} = useContext(AuthContext)
 
  return (
    <div
      className="h-[96px] pl-[32px] z-[90000] pr-[126px] py-[24px] bg-white flex justify-between items-center border-b-[1px] border-solid border-br_E9ECEF sticky top-0 left-0 right-0 min-w-[1280px]"
    >
      <div className="flex items-center">
        <Link to="/">
          <img className="h-[48px] w-[41px] object-cover" src={Logo} alt="" />
        </Link>
        <div className="ml-[12px] flex-1">
          <h3 className=" text-_9 xl:text-[13px] font-bold text-text_primary w-[370px]">
            {t("home.header.subTitle")}
          </h3>
        </div>
      </div>

      <div className=" flex items-center">
        {/* <div>
          <ICSearch color={Colors.text_primary} />
        </div>
        <HeaderOptionSlash /> */}
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
              <ICArrowDown color={Colors.text_primary} />
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
         <Avatar link={user?.imageUrl} name={user?.login + ""} />
          <span className="text-_14 text-text_primary mx-2">Admin</span>
          <div>
            <ICArrowDown color={Colors.text_primary} />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderOptionSlash = () => {
  return (
    <div className="w-[1px] h-[16px] hidden xl:block relative bg-primary mx-[24px]" />
  );
};

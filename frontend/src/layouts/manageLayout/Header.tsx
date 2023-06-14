import React, { useEffect, useState } from "react";
import { ICLogoFrame } from "@assets/icons/ICLogoFrame";
import { Colors } from "@constants/color";
import { Link, useLocation } from "react-router-dom";
import { ICGm } from "@assets/icons/ICGm";
import Avatar from "@assets/images/imageAccount.png";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { RouterManage } from "@constants/routerManager";
import { useTranslation } from "react-i18next";
const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [nameHeader, setNameHeader] = useState<string | null>(null);
  useEffect(() => {
    const endPath = pathname.slice(pathname.lastIndexOf("/") + 1);
    const ObName = RouterManage.find((item) => {
      return item.path.includes(endPath);
    });
    if (ObName) {
      setNameHeader(ObName.name);
    }
  }, [pathname]);
  return (
    <div className="h-spc120 w-full bg-text_white flex fixed top-0 z-max">
      <div className="w-[15.8%] flex items-center justify-center">
        <Link className="flex items-center relative justify-center" to="/">
          <div className="rotate-logo">
            <ICLogoFrame width={101.5} height={94} color={Colors.text_EA222A} />
          </div>
          <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="scale-logo scale-0">
              <ICGm color={Colors.Grey_Primary} />
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between w-[84.2%] pl-24 pr-[300px] shadow">
        <p className="title-18 text-text_EA222A">
          {nameHeader && t(nameHeader)}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-[50%] ">
            <img src={Avatar} alt="" />
          </div>
          <p className="text-base font-semibold ">
            Nguyễn Cường Phong
            <span className="inline-block ml-3 cursor-pointer">
              <ICArowDown color={Colors.Grey_Primary} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;

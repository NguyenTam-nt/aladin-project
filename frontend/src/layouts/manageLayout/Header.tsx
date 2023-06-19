import React, { useEffect, useState } from "react";
import { ICLogoFrame } from "@assets/icons/ICLogoFrame";
import { Colors } from "@constants/color";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";
import { ICGm } from "@assets/icons/ICGm";
import Avatar from "@assets/images/imageAccount.png";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { RouterManage } from "@constants/routerManager";
import { useTranslation } from "react-i18next";
import { prefixRootRoute } from "@constants/index";
const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [nameHeader, setNameHeader] = useState<string | null>(null);
  // const resolved = useResolvedPath(pathname);
  // const match = useMatch({ path: pathname, end: false });

  useEffect(() => {
    const endPath = pathname.slice(pathname.lastIndexOf("/") + 1);
    const ObName = RouterManage.find((item) => {
      return item.path.includes(endPath);
    });
    console.log(ObName, "jasjdfhj");

    if (ObName) {
      setNameHeader(ObName.name!);
    }
  }, [pathname]);
  return (
    <div className="h-spc120  pl-[96px] min-w-[calc(1920px_-_300px)]  w-full bg-text_white shadow-md flex sticky left-0 right-0 top-0 z-10 ">
      <div className="flex items-center w-[1224px] justify-between">
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

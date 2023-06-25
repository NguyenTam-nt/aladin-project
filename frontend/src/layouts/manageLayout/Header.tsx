import React, { useEffect, useState } from "react";
import { Colors } from "@constants/color";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { useAuthContext } from "@contexts/hooks/auth";
import { Avatar } from "@components/Avatar";
import { ICLogin } from "@assets/icons/ICLogin";
import { useClickOutItem } from "@hooks/useClickOutItem";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { prefixRootRoute } from "@constants/index";
import { RouterManage } from "@constants/routerManager";
import { useTranslation } from "react-i18next";
const Header = () => {
  const { user, doLogout } = useAuthContext();
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  const navigate = useNavigate();

  const handleLogout = () => {
    doLogout();
    navigate(prefixRootRoute.public);
  };

  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [nameHeader, setNameHeader] = useState<string | null>(null);

  useEffect(() => {
    const endPath = pathname.slice(pathname.lastIndexOf("/") + 1);
    const ObName = RouterManage.find((item) => {
      return item.path.includes(endPath);
    });
    if (ObName) {
      setNameHeader(ObName.name!);
    }
  }, [pathname]);

  return (
    <div className="h-spc120 px-[70px] 2xl:pl-[96px] min-w-full bg-text_white shadow-md flex sticky left-0 right-0 top-0 z-10 ">
      <div className="flex items-center w-[1224px] justify-between">
        <p className="title-18 text-text_EA222A">
          {nameHeader && t(nameHeader)}
        </p>
        <div ref={ref} className=" relative">
          <div
            onClick={handleToggleItem}
            className="flex cursor-pointer items-center gap-2 relative"
          >
            <div className="w-14 h-14 rounded-[50%] ">
              <Avatar
                size={56}
                url={user?.imageUrl}
                name={user?.fullname + ""}
              />
            </div>
            <p className="text-base font-semibold ">
              {user?.fullname}
              <button className="inline-block ml-3 cursor-pointer">
                <ICArowDown color={Colors.Grey_Primary} />
              </button>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className={clsx(
              " absolute w-full opacity-0 flex items-center justify-center text-_16 font-semibold  h-[56px] bg-white top-[100%] left-0 shadow-lg",
              {
                "logout-box": isShow,
              }
            )}
          >
            <span className="mr-2">
              <ICLogin color={Colors.text_A1A0A3} />
            </span>{" "}
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

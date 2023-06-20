import React, { useEffect, useState } from "react";
import { ICLogoFrame } from "@assets/icons/ICLogoFrame";
import { Colors } from "@constants/color";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { useAuthContext } from "@contexts/hooks/auth";
import { Avatar } from "@components/Avatar";
import { ICLogin } from "@assets/icons/ICLogin";
import { useClickOutItem } from "@hooks/useClickOutItem";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { prefixRootRoute } from "@constants/index";
const Header = () => {
  const { user, doLogout } = useAuthContext();
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  const navigate = useNavigate();

  const handleLogout = () => {
    doLogout();
    navigate(prefixRootRoute.public);
  };

  return (
    <div className="h-spc120  pl-[96px] min-w-[calc(1920px_-_300px)]  w-full bg-text_white shadow-md flex sticky left-0 right-0 top-0 z-10 ">
      <div className="flex items-center w-[1224px] justify-between">
        <p className="title-18 text-text_EA222A">Quản lý banner</p>
        <div ref={ref} className=" relative">
          <button
            onClick={handleToggleItem}
            className="flex items-center gap-2 relative"
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
          </button>
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

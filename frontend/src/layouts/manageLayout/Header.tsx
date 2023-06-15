import React from "react";
import { Colors } from "@constants/color";
import Avatar from "@assets/images/imageAccount.png";
import { ICArowDown } from "@assets/icons/ICArowDown";
const Header = () => {
  return (
    <div className="h-spc120  pl-[96px] min-w-[calc(1920px_-_300px)]  w-full bg-text_white shadow-md flex sticky left-0 right-0 top-0 ">
      <div className="flex items-center w-[1224px] justify-between">
        <p className="title-18 text-text_EA222A">Quản lý banner</p>
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

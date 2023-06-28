import { ICLogo } from "@assets/icons";
import { ICGm } from "@assets/icons/ICGm";
import { ICLogoFrame } from "@assets/icons/ICLogoFrame";
import { Colors } from "@constants/color";
import React from "react";

export const Splash = () => {
  return (
    <div className="w-[100vw] flex items-center justify-center h-[100vh]">
      <div className="flex items-center justify-center" >
        {/* <div className="rotate-logo-mb ">
          <ICLogoFrame />
        </div>
        <div className=" absolute top-[50%] left-[50%] flex items-center justify-center translate-x-[-50%] translate-y-[-50%]">
          <div className="scale-logo-mb scale-0">
            <ICGm color={Colors.text_black} />
          </div>
        </div> */}
        <ICLogo color={Colors.text_black} />
      </div>
    </div>
  );
};

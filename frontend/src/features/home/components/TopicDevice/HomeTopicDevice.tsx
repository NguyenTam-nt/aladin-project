import Image1 from "@assets/images/home/bgdevice/home_device1.webp"
import Image2 from "@assets/images/home/bgdevice/home_device2.webp"
import React, { memo } from "react";
import { HomeTopicDeviceList } from "./HomeTopicDeviceList";
import { windownSizeWidth, withResponsive } from "@constants/index";

export const HomeTopicDevice = memo(() => {
  return (
    <div className="relative h-auto py-[40px] lg:py-[110px] ">
      {windownSizeWidth > withResponsive._1024 ? (
        <>
          <div className="absolute left-0 top-0 select-none  pointer-events-none">
            <img src={Image1} alt="" />
          </div>
          <div className="absolute right-0 top-0 select-none  pointer-events-none">
           <img src={Image2} alt="" />
          </div>
        </>
      ) : null}
      <HomeTopicDeviceList />
    </div>
  );
});

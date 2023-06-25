import { ICHomeTopicDeviceLeft } from "@assets/icons/ICHomeTopicDeviceLeft";
import { ICHomeTopicDeviceRight } from "@assets/icons/ICHomeTopicDeviceRight";
import React, { memo } from "react";
import { HomeTopicDeviceList } from "./HomeTopicDeviceList";
import { windownSizeWidth, withResponsive } from "@constants/index";

export const HomeTopicDevice = memo(() => {
  return (
    <div className="relative h-auto py-[40px] lg:py-[110px] ">
      {windownSizeWidth > withResponsive._1024 ? (
        <>
          <div className="absolute left-0 top-0 select-none  pointer-events-none">
            <ICHomeTopicDeviceLeft />
          </div>
          <div className="absolute right-0 top-0 select-none  pointer-events-none">
            <ICHomeTopicDeviceRight />
          </div>
        </>
      ) : null}
      <HomeTopicDeviceList />
    </div>
  );
});

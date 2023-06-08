import { ICHomeTopicDeviceLeft } from "@assets/icons/ICHomeTopicDeviceLeft";
import { ICHomeTopicDeviceRight } from "@assets/icons/ICHomeTopicDeviceRight";
import React, { memo } from "react";
import { HomeTopicDeviceList } from "./HomeTopicDeviceList";


export const HomeTopicDevice = memo(() => {
  return (
    <div className="relative h-[560px] py-[110px] ">
      <div className="absolute left-0 top-0">
        <ICHomeTopicDeviceLeft />
      </div>
      <div className="absolute right-0 top-0">
        <ICHomeTopicDeviceRight />
      </div>
      <HomeTopicDeviceList />
    </div>
  );
})

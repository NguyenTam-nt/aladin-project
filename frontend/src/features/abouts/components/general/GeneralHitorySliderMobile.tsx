import React from "react";
import { GeneralHistoryItemMobile } from "./GeneralHistoryItemMobile";

export const GeneralHitorySliderMobile = () => {
  return (
    <div className="relative mt-[24px]">
      <div className="w-[4px] h-full bg-bg_9EA8B3 absolute top-0 left-[-2px]" />
      <GeneralHistoryItemMobile />
      <GeneralHistoryItemMobile />
      <GeneralHistoryItemMobile />
      <GeneralHistoryItemMobile />
    </div>
  );
};

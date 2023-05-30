import React from "react";
import { GeneralHistoryItemMobile } from "./GeneralHistoryItemMobile";
import type { IHistory } from "@typeRules/history";
type Props = {
  data: IHistory[]
}
export const GeneralHitorySliderMobile = ({data}:Props) => {
  return (
    <div className="relative mt-[24px]">
      <div className="w-[4px] h-full bg-bg_9EA8B3 absolute top-0 left-[-2px]" />
      {
        data.map((item, index) => {
          return <GeneralHistoryItemMobile data={item} key={index} />
        })
      }
    </div>
  );
};

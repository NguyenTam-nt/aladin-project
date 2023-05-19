import React from "react";
import { GeneralHistoryItemMobile } from "./GeneralHistoryItemMobile";
type Props = {
  data: {
    year: number,
    des_vn: string,
    des_ko: string,
    img: string
  }[]
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

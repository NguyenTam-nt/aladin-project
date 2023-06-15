import React, { memo } from "react";
import { MenuBodyFilterItem } from "./MenuBodyFilterItem";
import { ICDeleteSibar } from "@assets/icons/ICDeleteSibar";
import { windownSizeWidth, withResponsive } from "@constants/index";

const data = ["Lẩu 1 ngăn", "Lẩu 2 ngăn", "Lẩu 4 ngăn"];
const dataList = [
  {
    title: "Lẩu",
    listItem: data,
  },
  {
    title: "Món lẻ",
    listItem: data,
  },
  {
    title: "Combo hot",
    listItem: data,
  },
  {
    title: "Điểm tâm",
  },
];

type Props = {
  onHidden?: () => void,
}

export const MenuBodyFilterByCategory = memo(({onHidden}:Props) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-_16 font-semibold lg:font-normal lg:title-32 text-secondary lg:mb-[32px]">
          Thực đơn
        </h3>
        {windownSizeWidth <= withResponsive._1024 ? (
          <button onClick={onHidden}>
            <ICDeleteSibar />
          </button>
        ) : null}
      </div>
      {dataList.map((item, index) => {
        return <MenuBodyFilterItem key={index} data={item} />;
      })}
    </div>
  );
});

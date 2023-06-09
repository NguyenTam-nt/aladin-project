import React, { memo } from 'react'
import { MenuBodyFilterItem } from './MenuBodyFilterItem';

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

export const MenuBodyFilterByCategory = memo(() => {
  return (
    <div className="w-[246px]">
    <h3 className="title-32 text-secondary mb-[32px]">Thực đơn</h3>
    {dataList.map((item, index) => {
      return <MenuBodyFilterItem key={index} data={item} />;
    })}
  </div>
  )
})

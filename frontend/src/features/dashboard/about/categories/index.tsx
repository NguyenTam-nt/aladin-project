import { ICEdit } from "@assets/icons/ICEdit";
import { InputSwitch } from "@components/InputSwitch";
import { TranslateContext } from "@contexts/Translation";
import { HeaderAdmin } from "@features/dashboard/components/HeaderAdmin";
import { SubHeaderTopic } from "@features/dashboard/home/components/SubHeaderTopic";
import React, { memo, useContext } from "react";

const data = [
  "Tổng quan",
  "Thương hiệu",
  "Cơ cấu tổ chức - nhân sự",
  "Broucher",
];

export const Categories = () => {
  const { t } = useContext(TranslateContext);
  return (
    <>
      <HeaderAdmin title="admin._about._category._title" />
      <SubHeaderTopic title="admin._about._category._title_post" />
      <div>
        <div className="flex items-center text-_18 font-semibold text-text_primary pb-[16px] border-b border-br_E9ECEF ">
          <div className="flex-1">
            {t("admin._about._category._table.name")}
          </div>
          <div className="w-[90px]">
            {t("admin._about._category._table._func")}
          </div>
        </div>
        {data.map((item, index) => {
          return <CategoryItem value={item} key={index} />;
        })}
      </div>
    </>
  );
};

type Props = {
    value: string
}

const CategoryItem = memo(({value}:Props) => {
  return (
    <div className="flex items-center text-_14 text-text_primary py-[28px] border-b border-br_E9ECEF ">
      <div className="flex-1">
        <input
          className=" border-transparent"
          value={value}
          onChange={() => {}}
        />
      </div>
      <div className="flex items-center">
        <InputSwitch />
        <button className="ml-[24px]">
          <ICEdit />
        </button>
      </div>
    </div>
  );
});

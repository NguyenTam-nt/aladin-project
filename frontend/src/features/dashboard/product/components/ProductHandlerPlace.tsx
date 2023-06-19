import { ICArowDown } from "@assets/icons/ICArowDown";
import TitleInput from "@components/TitleInput";
import { Colors } from "@constants/color";
import { useHandleCheckbox } from "@features/dashboard/category-product/useHandleCheckbox";
import { Checkbox } from "@features/dashboard/components/Checkbox";
import { useClickOutItem } from "@hooks/useClickOutItem";
import clsx from "clsx";
import React, { memo, useMemo, useState } from "react";

const dataCategory = [
  "Cơ sở 1  Cơ sở 1 - Nguyễn Trí Thanh",
  "Cơ sở 2 Cơ sở 1 - Nguyễn Trí Thanh",
  "Cơ sở 3 Cơ sở 1 - Nguyễn Trí Thanh",
  "Cơ sở 4 Cơ sở 1 - Nguyễn Trí Thanh",
  "Cơ sở 5 Cơ sở 1 - Nguyễn Trí Thanh",
  "Cơ sở 6 Cơ sở 1 - Nguyễn Trí Thanh",
  "Cơ sở 7 Cơ sở 1 - Nguyễn Trí Thanh",
  "Cơ sở 8 Cơ sở 1 - Nguyễn Trí Thanh",
  "Cơ sở 9 Cơ sở 1 - Nguyễn Trí Thanh",
  "Cơ sở 9 Cơ sở 1 - Nguyễn Trí Thanh",
  "Cơ sở 9 Cơ sở 1 - Nguyễn Trí Thanh",
];

export const ProductHandlerPlace = memo(() => {
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  const {
    refCheckboxAll,
    refCheckboxList,
    listChecked,
    handleCheckAll,
    handleCheckedItem,
  } = useHandleCheckbox(dataCategory.map((_, index) => index));

  const dataChecked = useMemo(() => {
    return dataCategory.filter((_, index) =>
      listChecked.some((item) => item === index)
    );
  }, [listChecked]);

  return (
    <div className=" col-span-1">
      <TitleInput name="adminProduct.form.category" />
      <div ref={ref} className="relative w-full">
        <button
          onClick={handleToggleItem}
          className={clsx("w-full  py-[13px] px-[16px] h-[48px] flex justify-between items-center border-[1px] border-solid border-text_A1A0A3", {
            "!border-TrueBlue_500":isShow
          })}
        >
          <span className="text-text_A1A0A3 gap-x-1 text-_14 line-clamp-1">
            {listChecked.length ?
            dataChecked.join(", ")
              
              : "Chọn cơ sở"}
          </span>
          <span>
            <ICArowDown color={Colors.text_A1A0A3} />
          </span>
        </button>
        <div
          className={clsx(
            "w-full h-0 ease-linear overflow-y-auto list-facilities duration-200 shadow-sm bg-white absolute top-[48px] left-0 grid grid-cols-2  ",
            {
              "h-[144px]": isShow,
            }
          )}
        >
          <ul className=" px-[16px]">
            <li className="flex h-[48px] items-center">
              <Checkbox onChange={handleCheckAll} ref={refCheckboxAll} />{" "}
              <span className="text-_14 text-GreyPrimary ml-[6px]">
                Chọn tất cả
              </span>
            </li>
            {dataCategory.map((item, index) => {
              return (
                <li key={index} className="flex h-[48px] items-center">
                  <Checkbox
                    onChange={(event) => {
                      handleCheckedItem(event, index);
                    }}
                    checked={listChecked.some((item) => item === index)}
                    ref={(ref: HTMLInputElement) =>
                      (refCheckboxList.current[index] = ref)
                    }
                  />{" "}
                  <span className="text-_14 text-GreyPrimary ml-[6px]">
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
});

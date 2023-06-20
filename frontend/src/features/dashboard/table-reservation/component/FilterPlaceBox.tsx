import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import { Button } from "@features/dashboard/components/Button";
import { Checkbox } from "@features/dashboard/components/Checkbox";
import { useClickOutItem } from "@hooks/useClickOutItem";
import React, { memo } from "react";
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
const FilterPlaceBox = memo(() => {
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  return (
    <div ref={ref} className="relative">
      <Button
        onClick={handleToggleItem}
        text="common.filter_by_place"
        className="max-w-[177px] whitespace-nowrap"
        image={
          <span className="ml-2">
            <ICArowDown color={Colors.TrueBlue500} />
          </span>
        }
        color={"empty"}
      />

      <div
        className={
          "absolute top-[105%] right-0 min-w-[300%] bg-white overflow-y-auto list-facilities shadow-sm px-5 z-40 " +
          (isShow ? "h-[200px]" : "h-0")
        }
      >
        <div className="flex h-[48px] items-center">
          <Checkbox
          //   onChange={handleCheckAll} ref={refCheckboxAll}
          />
          <span className="text-_14 text-GreyPrimary ml-[6px]">
            Chọn tất cả
          </span>
        </div>
        {dataCategory.map((item, index) => {
          {
            return (
              <div key={index} className="flex h-[48px] items-center">
                <Checkbox
                // onChange={(event) => {
                //   handleCheckedItem(event, index);
                // }}
                // checked={listChecked.some((item) => item === index)}
                // ref={(ref: HTMLInputElement) =>
                //   (refCheckboxList.current[index] = ref)
                // }
                />
                <span className="text-_14 text-GreyPrimary ml-[6px]">
                  {item}
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
});

export default FilterPlaceBox;

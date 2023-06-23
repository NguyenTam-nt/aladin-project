import { ICArowDown } from "@assets/icons/ICArowDown";
import TitleInput from "@components/TitleInput";
import { Colors } from "@constants/color";
import { useHandleCheckbox } from "@features/dashboard/category-product/useHandleCheckbox";
import { Checkbox } from "@features/dashboard/components/Checkbox";
import { useClickOutItem } from "@hooks/useClickOutItem";
import clsx from "clsx";
import React, { memo, useEffect, useMemo } from "react";
import { useGetPlace } from "./useGetPlace";
import InfiniteScroll from "react-infinite-scroll-component";
import type { PlaceType } from "@typeRules/place";
import type { IListInfrastructure } from "@typeRules/product";

type Props = {
  onChange: (data:IListInfrastructure[]) => void
  listValue?: IListInfrastructure[]
}

export const ProductHandlerPlace = memo(({onChange, listValue = []}:Props) => {
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  const { categories, fechData } = useGetPlace(true);
  const {
    refCheckboxAll,
    refCheckboxList,
    listChecked,
    handleCheckAll,
    handleCheckedItem,
    setListChecked
  } = useHandleCheckbox(categories.map((item) => Number(item.id)));

  const dataChecked = useMemo(() => {
    return categories.filter((itemP) =>
      listChecked.some((item) => item === itemP.id)
    );
  }, [listChecked]);

  useEffect(() => {
    if(listValue.length) {
      setListChecked(listValue.map(i => Number(i.id)))
    }
  }, [listValue])

  useEffect(() => {
    const listDataChecked = categories.filter(item => listChecked.some(i => i === item.id)).map(i => ({id: i.id, name: i.name}));
    onChange([...listDataChecked])
  }, [listChecked, categories])

  return (
    <div className=" col-span-1">
      <TitleInput name="adminProduct.form.category" />
      <div ref={ref} className="relative w-full">
        <button
          onClick={handleToggleItem}
          className={clsx(
            "w-full  py-[13px] px-[16px] h-[48px] flex justify-between items-center border-[1px] border-solid border-text_A1A0A3",
            {
              "!border-TrueBlue_500": isShow,
            }
          )}
        >
          <span className="text-text_A1A0A3 gap-x-1 text-_14 line-clamp-1">
            {listChecked.length ? dataChecked.map(item => item.name).join(", ") : "Chọn cơ sở"}
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
          <InfiniteScroll
            hasMore
            loader={<></>}
            next={fechData}
            dataLength={categories.length}
            scrollableTarget="place-product"
          >
            <ul className=" px-[16px]">
              <li className="flex h-[48px] items-center">
                <Checkbox onChange={handleCheckAll} ref={refCheckboxAll} />{" "}
                <span className="text-_14 text-GreyPrimary ml-[6px]">
                  Chọn tất cả
                </span>
              </li>
              {categories.map((item, index) => {
                return (
                  <li key={index} className="flex h-[48px] items-center">
                    <Checkbox
                      onChange={(event) => {
                        handleCheckedItem(event, index);
                      }}
                      checked={listChecked.some((itemC) => itemC === item.id)}
                      ref={(ref: HTMLInputElement) =>
                        (refCheckboxList.current[index] = ref)
                      }
                    />{" "}
                    <span className="text-_14 text-GreyPrimary ml-[6px]">
                      {item.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
});

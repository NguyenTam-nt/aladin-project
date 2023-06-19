import { ICArowDown } from '@assets/icons/ICArowDown';
import TitleInput from '@components/TitleInput';
import { Colors } from '@constants/color';
import { useClickOutItem } from '@hooks/useClickOutItem';
import clsx from 'clsx';
import React, { memo, useState } from 'react'

const dataCategory = [
    {
      name: "lẩu",
      items: ["Lẩu 1 ngăn", "Lẩu 2 ngăn", "Lẩu 3 ngăn", "Lẩu 4 ngăn"],
    },
    {
      name: "Combo hot",
      items: ["Lẩu 1 ngăn", "Lẩu 2 ngăn", "Lẩu 3 ngăn", "Lẩu 4 ngăn"],
    },
    {
      name: "Món lẻ",
      items: ["Lẩu 1 ngăn", "Lẩu 2 ngăn", "Lẩu 3 ngăn", "Lẩu 4 ngăn"],
    },
    {
      name: "Món lẻ",
      items: ["Lẩu 1 ngăn", "Lẩu 2 ngăn", "Lẩu 3 ngăn", "Lẩu 4 ngăn"],
    },
    {
      name: "Món lẻ",
      items: ["Lẩu 1 ngăn", "Lẩu 2 ngăn", "Lẩu 3 ngăn", "Lẩu 4 ngăn"],
    },
    {
      name: "Món lẻ",
      items: ["Lẩu 1 ngăn", "Lẩu 2 ngăn", "Lẩu 3 ngăn", "Lẩu 4 ngăn"],
    },
  ];

export const ProductHandlerCategory = memo(() => {
    const {ref, isShow, handleToggleItem} = useClickOutItem()
    const [indexActive, setIndex] = useState<number>(-1)
    const [subIndex, setSubIndex] = useState<number>(-1)
    const handleSelectCategory = (index:number) => {
        if(indexActive !== index) {
            setIndex(index)
            setSubIndex(-1)
        }
    }
    const handleSelectCategorySub = (index:number) => {
        setSubIndex(index)
      }
    
  return (
    <div className=" col-span-1">
          <TitleInput name="adminProduct.form.category" />
          <div ref={ref} className="relative w-full">
            <button onClick={handleToggleItem} className={clsx("w-full  py-[13px] px-[16px] h-[48px] flex justify-between items-center border-[1px] border-solid border-text_A1A0A3", {
              "!border-TrueBlue_500": isShow
            })}>
              <span className="text-text_A1A0A3 text-_14">{indexActive !== -1 ? `${dataCategory[indexActive].name} ${ dataCategory[indexActive]?.items?.[subIndex] ? "- " + dataCategory[indexActive]?.items?.[subIndex] : ""}`  : "Chọn danh mục"}</span>
              <span>
                <ICArowDown color={Colors.text_A1A0A3} />
              </span>
            </button>
            <div className={clsx("w-full h-0 ease-linear duration-200 shadow-sm bg-white absolute top-[48px] left-0 grid grid-cols-2  ", {
                "h-[144px]":isShow
            })}>
              <div className="h-full overflow-y-auto category-select-group list-facilities">
                {dataCategory.map((item, index) => {
                    const isActive = indexActive === index
                  return (
                    <button
                     onClick={() => handleSelectCategory(index)}
                      key={index}
                      className={clsx("w-full flex justify-between items-center h-[48px] py-[13px] px-[16px]", {
                        "bg-TrueBlue_500 text-text_white":isActive
                      })}
                    >
                      <span>{item.name}</span>{" "}
                      <span className=" rotate-[-90deg]">
                        <ICArowDown color={isActive ? Colors.text_white : Colors.text_black} />
                      </span>
                    </button>
                  );
                })}
              </div>
              {
                indexActive !== -1 ? (
                <div className="h-full overflow-y-auto  category-select-group list-facilities">
                    {dataCategory[indexActive].items.map((item, index) => {
                         const isActive = subIndex === index
                    return (
                        <button
                        onClick={() => handleSelectCategorySub(index)}
                        key={index}
                        className={clsx("w-full flex justify-between items-center h-[48px] py-[13px] px-[16px]",
                        {
                            "bg-TrueBlue_500 text-text_white":isActive
                          }
                        )}
                        >
                        <span>{item}</span>{" "}
                        <span className=" rotate-[-90deg]">
                            <ICArowDown color={isActive ? Colors.text_white : Colors.text_black} />
                        </span>
                        </button>
                    );
                    })}
                </div>

                ) : null
              }
            </div>
          </div>
        </div>
  )
})

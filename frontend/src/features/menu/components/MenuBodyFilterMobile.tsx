import { ICMenuBar } from "@assets/icons/ICMenuBar";
import { Colors } from "@constants/color";
import React, { useState } from "react";
import { MenuBodyFilterByCategory } from "./MenuBodyFilterByCategory";
import clsx from "clsx";
import { useClickOutItem } from "@hooks/useClickOutItem";
import type { ICategory } from "@typeRules/category";

type Props = {
  categories: ICategory[]
  handleChangeCategoryParent : (id:number) => void,
  handleSelectCategorySub:  (id:number, idParent:number) => void,
  indexChild: number,
  indexParent: number,
  nameP?: string,
  nameC?: string
  handleClear: () => void
}

export const MenuBodyFilterMobile = ({categories, handleChangeCategoryParent, handleSelectCategorySub, indexChild, indexParent, nameC, nameP, handleClear}:Props) => {
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  return (
    <div className="flex justify-between ">
      <h3 onClick={handleClear} className="title-64 text-secondary w-fit cursor-pointer">{`${nameP} - ${nameC}`}</h3>
      <div ref={ref} className="relative flex items-center">
        <button onClick={handleToggleItem}>
          <ICMenuBar color={Colors.secondary} />
        </button>
        <div
          className={clsx(
            "absolute w-[350px] p-[16px] top-[calc(100%_+_15px)] right-[8px] bg-white z-[8] menu-body-category",
            {
              "scale-menu": isShow,
            }
          )}
        >
          <MenuBodyFilterByCategory handleClear={handleClear} categories={categories} handleChangeCategoryParent={handleChangeCategoryParent} handleSelectCategorySub={handleSelectCategorySub} indexChild={indexChild} indexParent={indexParent} onHidden={handleToggleItem} />
        </div>
      </div>
    </div>
  );
};

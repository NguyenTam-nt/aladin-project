import { ICMenuBar } from "@assets/icons/ICMenuBar";
import { Colors } from "@constants/color";
import React, { useState } from "react";
import { MenuBodyFilterByCategory } from "./MenuBodyFilterByCategory";
import clsx from "clsx";
import { useClickOutItem } from "@hooks/useClickOutItem";

type Props = {
  onChangeCategory: (id:number) => void
}

export const MenuBodyFilterMobile = ({onChangeCategory}:Props) => {
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  return (
    <div className="flex justify-between ">
      <h3 className="title-64 text-secondary">Lẩu 2 ngăn</h3>
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
          <MenuBodyFilterByCategory onChangeCategory={onChangeCategory} onHidden={handleToggleItem} />
        </div>
      </div>
    </div>
  );
};

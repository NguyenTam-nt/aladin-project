import { ICMenuBar } from "@assets/icons/ICMenuBar";
import { Colors } from "@constants/color";
import React, { useState } from "react";
import { MenuBodyFilterByCategory } from "./MenuBodyFilterByCategory";
import clsx from "clsx";
import { useClickOutItem } from "@hooks/useClickOutItem";

export const MenuBodyFilterMobile = () => {
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
            "absolute w-[350px] p-[16px] top-[calc(100%_+_15px)] right-[8px] bg-white z-[5] menu-body-category",
            {
              "scale-menu": isShow,
            }
          )}
        >
          <MenuBodyFilterByCategory onHidden={handleToggleItem} />
        </div>
      </div>
    </div>
  );
};

import React, { ReactNode, memo, useEffect, useState } from "react";
import clsx from "clsx";
import useFocusOut from "@hooks/useFocusOut";
import { PrevIcon } from "@assets/icons/plust-mark/PrevIcon";
import { colors } from "@utility/colors";

interface DropDowProps {
  listDropdow?: { name: string; id?: number }[];
  handleFilter?: (value: any) => void;
  iconLeft?: ReactNode;
  icon?: ReactNode;
  className?: string;
  listIdChecked?: number[];
  nameBox?: string;
  children?: JSX.Element;
}
const DropdowBox = memo(
  ({
    listDropdow,
    handleFilter,
    className = "",
    nameBox,
    listIdChecked,
    children,
    icon,
    iconLeft,
  }: DropDowProps) => {
    const { clickShow, handleClickInside, setClickShow, ref } = useFocusOut();
    return (
      <div ref={ref} className={"relative group " + className}>
        <div
          onClick={() => setClickShow(true)}
          className="w-full flex items-center justify-between border border-neutra-neutra80 cursor-pointer px-5 h-10 min-w-[142px] rounded-sm "
        >
          {iconLeft}
          <span className="normal_text line-clamp-1 ">{nameBox || ""}</span>
          {!icon && (
            <span
              className={
                "transition-all ease-in " +
                (clickShow ? "-rotate-90" : "-rotate-180")
              }
            >
              <PrevIcon width={18} height={18} color={colors.black} />
            </span>
          )}
          {icon}
        </div>
        {clickShow && (
          <div className="absolute top-[110%] w-full py-0 rounded-sm border border-neutra-neutra80 bg-white shadow-tootip cursor-pointer z-20">
            {children}
          </div>
        )}
      </div>
    );
  }
);

export default DropdowBox;

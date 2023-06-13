import clsx from "clsx";
import React from "react";

type Props = {
  discount: number;
  className?: string
};

export const DiscountItem = ({ discount, className = "" }: Props) => {
  return (
    <div className={clsx(`w-[61px] z-[2] absolute top-[16px] left-[16px] rounded-[16px_0_16px_0] h-[32px] bg-bg_E73F3F text-_13 font-bold text-white flex items-center justify-center ${className}`)}>
      <span className="discount-animated ">{discount}%</span>
    </div>
  );
};

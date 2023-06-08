import React from "react";

type Props = {
  discount: number;
};

export const DiscountItem = ({ discount }: Props) => {
  return (
    <div className="w-[61px] z-[2] absolute top-[16px] left-[16px] rounded-[16px_0_16px_0] h-[32px] bg-bg_E73F3F text-_13 font-bold text-white flex items-center justify-center">
      {discount}%
    </div>
  );
};

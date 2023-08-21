import CartIcon from "@assets/iconElements/CartIcon";
import { TooltipSale } from "@assets/icons";
import CricleButton from "@components/Buttons/CricleButton";
import DynamicButton from "@components/Buttons/DynamicButton";
import { CartItem } from "@contexts/CartContext";
import { colors } from "@utility/colors";
import React, { memo } from "react";

interface Props {
  // item: CartItem;
  description?: string;
  showBtn?: boolean;
}

const Discount = memo(({ percent }: { percent: number }) => {
  return (
    <div className="absolute top-0 left-0 text-white font-bold">
      <div className="relative flex">
        <TooltipSale className="w-full" />
        <span className="text-2xl text-white font-bold absolute top-1/2 left-[16%] -translate-x-[16%] -translate-y-1/2">
          -{percent}%
        </span>
      </div>
    </div>
  );
});
function CardItem({ description, showBtn = true }: Props) {
  return (
    <div className="relative p-3 rounded-lg overflow-hidden bg-white">
      <Discount percent={30} />
      <div className="2xl:min-h-spc280 2xl:h-[350px]  h-[280px] px-5">
        <img
          src="https://supershop.vn/api/image/1690982804721"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <hr className="w-3/4 h-[1px] bg-gray-100 mx-auto" />
      {showBtn ? (
        <div className="">
          <p className="text-base text-text-main font-normal line-clamp-2 mb-[6px]">
            Hộp trà tắc giảm cân an toàn Jeju Hàn Quốc
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-main">400.000đ</span>
            <span className="text_base text-text-disable">
              Đã bán {description}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <DynamicButton
              text="button.byNow"
              normal={false}
              className="!rounded bg-aqua-aq02 !min-w-[83px] text_base text-white"
            />
            <CricleButton
              className="w-9 h-9"
              icon={<CartIcon color={colors.aqua02} />}
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          <p className="text-base text-text-main font-normal line-clamp-2 mb-1">
            Hộp trà tắc giảm cân an toàn Jeju Hàn Quốc
          </p>
          <div className="flex items-end gap-6">
            <span className="text-lg font-bold text-main">400.000đ</span>
            {description && (
              <span className="text_base text-text-disable line-through">
                430.000đ
              </span>
            )}
          </div>
          <CricleButton
            className="w-9 h-9 absolute bottom-1 right-0"
            icon={<CartIcon color={colors.aqua02} />}
          />
        </div>
      )}
    </div>
  );
}

export default CardItem;

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
    <div className="absolute sc480:top-0 -top-1 left-0 text-white font-bold">
      <div className="relative flex">
        <TooltipSale className="sc480:w-full w-[91px]" />
        <span className="sc480:text-2xl text-lg text-white font-bold absolute top-1/2 left-[16%] -translate-x-[16%] -translate-y-1/2">
          -{percent}%
        </span>
      </div>
    </div>
  );
});
function CardItem({ description, showBtn = true }: Props) {
  return (
    <div className="relative p-3 sc480:rounded-lg rounded-[12px] overflow-hidden bg-white">
      <Discount percent={30} />
      <div className="2xl:min-h-spc280 2xl:h-[350px]  sc480:min-h-[280px] h-[175px] 2xl:px-5">
        <img
          src="https://supershop.vn/api/image/1690982804721"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <hr className="w-full h-[1px] bg-gray-100 mx-auto mb-2" />
      {showBtn ? (
        <div className="">
          <p className="sc480:text-base text-xs text-text-main font-normal line-clamp-2 mb-[6px]">
            Hộp trà tắc giảm cân an toàn Jeju Hàn Quốc
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="sc480:text-lg text-xs font-bold text-main">
              400.000đ
            </span>
            <span className="text_base text-text-disable">
              Đã bán {description}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <DynamicButton
              text="button.byNow"
              normal={false}
              className="!rounded bg-aqua-aq02 !min-w-[83px] sc480:text_base text-xs !text-white"
            />
            <CricleButton
              className="w-9 h-9"
              icon={<CartIcon color={colors.aqua02} />}
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          <p className="sc480:text-base text-xs text-text-main font-normal line-clamp-2 mb-1">
            Hộp trà tắc giảm cân an toàn Jeju Hàn Quốc
          </p>
          <div className="flex items-end gap-6">
            <span className="sc480:text-lg text-xs font-bold text-main">
              400.000đ
            </span>
            {description && (
              <span className="sc480:text_base text-xs text-text-disable line-through">
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

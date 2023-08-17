import CartIcon from "@assets/iconElements/CartIcon";
import CricleButton from "@components/Buttons/CricleButton";
import DynamicButton from "@components/Buttons/DynamicButton";
import { CartItem } from "@contexts/CartContext";
import { colors } from "@utility/colors";
import React from "react";

interface Props {
  item: CartItem;
}
const CardItem = () => {
  return (
    <div className="relative rounded-lg bg-white w-[280px]">
      <div>
        <img
          src="https://supershop.vn/api/image/1690982804721"
          alt=""
          className="w-full object-contain"
        />
      </div>
      <hr className="w-3/4 h-[1px] bg-gray-100 mx-auto" />
      <div className="p-3">
        <p className="text-base text-text-main font-normal line-clamp-2 mb-[6px]">
          Hộp trà tắc giảm cân an toàn Jeju Hàn Quốc
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-main">400.000đ</span>
          <span className="text_base text-text-disable">Đã bán 10</span>
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
    </div>
  );
};

export default CardItem;

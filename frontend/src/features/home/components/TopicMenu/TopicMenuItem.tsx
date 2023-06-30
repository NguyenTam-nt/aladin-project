import React, { memo, useState, MouseEvent } from "react";
import { DiscountItem } from "../DiscountItem";
import { formatNumberDot, formatNumberDotSlice } from "@commons/formatMoney";
import { MoneyLineThrough } from "../MoneyLineThrough";
import { Button } from "@components/Button";
import { Link } from "react-router-dom";
import { paths } from "@constants/routerPublic";
import type { IProduct } from "@typeRules/product";
import { useCartContext } from "@contexts/hooks/order";
// import { AnimatedSmoke } from "@components/AnimatedSmoke";

type Props = {
  data: IProduct;
};

export const TopicMenuItem = memo(({ data }: Props) => {
  const { handlePlusCart } = useCartContext();

  const [count, setCount] = useState(1);
  const handleMinusCount = () => {
    if (count <= 1) return;
    setCount((count) => count - 1);
  };

  const handlePushCart = (e:MouseEvent<HTMLButtonElement>) => {
    const {top, left} = e.currentTarget.getBoundingClientRect()
    handlePlusCart(data, count, {top, left});
    setCount(1);
  };

  const handlePlusCount = () => {
    // if(count <= 1) return
    setCount((count) => count + 1);
  };

  return (
    <div className="relative parentSmoker">
      {/* <AnimatedSmoke /> */}
      <div className="radius-tl-br hover:shadow-xl menu-item duration-200 ease-linear flex flex-col overflow-hidden relative h-[370px] lg:h-[492px] max-h-auto bg-white">
        {data?.pricePromotion !== data?.price ? (
          <DiscountItem discount={Math.ceil(Number(data?.percent))} />
        ) : null}
        <Link
          to={`${paths.memu.prefix}/${data?.id}`}
          className="h-[160px] lg:h-[312px] w-full relative"
        >
          <img
            className="w-full h-full object-cover"
            src={data?.linkMedia}
            alt=""
          />
        </Link>
        <div className="p-[16px] flex-1 flex flex-col">
          <p className="text-GreyPrimary text-_14 lg:text-_16 font-semibold line-clamp-3 lg:line-clamp-2">
            {data?.name}
          </p>
          <p className="text-_16 lg:text-_18 line-clamp-1 font-bold mt-2 text-secondary">
            {formatNumberDotSlice(Number(data?.pricePromotion))}
            {(data?.pricePromotion !== data?.price && data?.pricePromotion.toString().length <= 8) ? (
              <MoneyLineThrough money={Number(data?.price)} />
            ) : null}
          </p>
          <div className="flex flex-col lg:flex-row flex-1 lg:max-h-[48px] justify-between items-end mt-auto gap-x-[16px]">
            <div className="flex items-center self-start  lg:self-center flex-1 gap-x-[16px] text-GreyPrimary text-_14 lg:font-semibold">
              <button
                onClick={handleMinusCount}
                className="text-_18 lg:text-_24 w-[30px] h-[30px]  flex items-center justify-center hover:shadow-sm rounded"
              >
                −
              </button>
              <span className=" break-words">{count}</span>
              <button
                onClick={handlePlusCount}
                className="text-_18 lg:text-_24 w-[30px] h-[30px] flex items-center justify-center hover:shadow-sm rounded"
              >
                +
              </button>
            </div>
            <div className="w-full lg:max-w-[120px] 2xl:w-[167px]">
              <Button
                onClick={handlePushCart}
                text="Thêm vào giỏ"
                classNameParent="min-w-full lg:w-none"
                className="min-w-full lg:max-w-[120px] 2xl:max-w-full !h-[40px] lg:!h-[48px] !text-_14 font-bold"
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

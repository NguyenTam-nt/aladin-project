import { formatNumberDot } from "@commons/formatMoney";
import { Button } from "@components/Button";
import { paths } from "@constants/routerPublic";
import { useCartContext } from "@contexts/hooks/order";
import { DiscountItem } from "@features/home/components/DiscountItem";
import { MoneyLineThrough } from "@features/home/components/MoneyLineThrough";
import type { IProduct } from "@typeRules/product";
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  data: IProduct;
};

export const MenuDetailInfo = memo(({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="mt-[24px] lg:mt-0">
      <h3 className="text-_24 font-iCielBC_Cubano lg:title-32 text-secondary">
        {data.name}
      </h3>
      <div className="flex mt-2  items-center gap-x-[24px]">
        <div className="flex items-center">
          <span className="text-_16 lg:text-_24 font-bold">
            {formatNumberDot(Number(data?.pricePromotion))}
          </span>
          {data?.price !== data?.pricePromotion ? (
            <MoneyLineThrough
              money={Number(data?.price)}
              className=" lg:text-_16"
            />
          ) : null}
        </div>
        {Number(data?.percent) > 0 ? (
          <DiscountItem
            className=" bg-text_EA222A !static hidden lg:flex"
            discount={Math.ceil(Number(data?.percent))}
          />
        ) : null}
      </div>
      <div className="mt-[16px] lg:mt-[24px]">
        <p className="hidden lg:block text-_16 font-semibold text-GreyPrimary">
          {t("common.info_product")}
        </p>

        <pre
          className="text-_14 p-0 bg-transparent border-none !font-IBM_Plex_Sans text-text_secondary"
          dangerouslySetInnerHTML={{
            __html: data.description,
          }}
        />
      </div>
      <InforOrder data={data} />
    </div>
  );
});

export const InforOrder = ({ data }: Props) => {
  const { handlePlusCart, handleMinusCart, handleDeleteCart } =
    useCartContext();
  const navigation = useNavigate();
  const [count, setCount] = useState(1);
  const handleMinusCount = () => {
    if (count <= 1) return;
    setCount((count) => count - 1);
  };

  const handlePlusCount = () => {
    setCount((count) => count + 1);
  };

  const handlePush = () => {
    handlePlusCart(data, count);
    navigation(paths.orderFood.prefix);
  };

  return (
    <div className="flex items-center w-full flex-wrap gap-[12px] sm:gap-[24px] mt-[24px]">
      <span className="text-black text-_14 font-semibold">Số lượng</span>
      <div className=" w-[80px] _420:w-[100px] sm:w-[153px] h-[48px] border border-primary rounded-[16px_0_16px_0] justify-center flex items-center  gap-x-[16px] text-black text-_14 font-semibold">
        <button
          onClick={handleMinusCount}
          className="text-_24 w-[30px] h-[30px]  flex items-center justify-center hover:shadow-sm rounded"
        >
          −
        </button>
        <span className=" break-words">{count}</span>
        <button
          onClick={handlePlusCount}
          className="text-_24 w-[30px] h-[30px] flex items-center justify-center hover:shadow-sm rounded"
        >
          +
        </button>
      </div>
      <Button
        onClick={handlePush}
        className=" min-w-[70px] _420:min-w-[120px] sm:min-w-[167px] h-[48px]"
        text="Đặt món"
        color={"primary"}
      />
    </div>
  );
};

import { formatNumberDot } from "@commons/formatMoney";
import { DiscountItem } from "@features/home/components/DiscountItem";
import { MoneyLineThrough } from "@features/home/components/MoneyLineThrough";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  des: string;
  price: number;
  pricePromotion: number;
  percent: number;
};

export const MenuDetailInfo = memo(({
  title,
  des,
  percent,
  price,
  pricePromotion,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div className="mt-[24px] lg:mt-0">
      <h3 className="text-_24 font-iCielBC_Cubano lg:title-32 text-secondary">
        {title}
      </h3>
      <div className="flex mt-2  items-center gap-x-[24px]">
        <div className="flex items-center">
          <span className="text-_16 lg:text-_24 font-bold">
            {formatNumberDot(pricePromotion)}
          </span>
          <MoneyLineThrough money={price} className=" lg:text-_16" />
        </div>
        {percent > 0 ? (
          <DiscountItem
            className=" bg-text_EA222A !static hidden lg:flex"
            discount={Math.ceil(percent)}
          />
        ) : null}
      </div>
      <div className="mt-[16px] lg:mt-[24px]">
        <p className="hidden lg:block text-_16 font-semibold text-GreyPrimary">
          {t("common.info_product")}
        </p>

        <div
          className="text-_14 text-text_secondary"
          dangerouslySetInnerHTML={{
            __html: des,
          }}
        />
      </div>
    </div>
  );
})

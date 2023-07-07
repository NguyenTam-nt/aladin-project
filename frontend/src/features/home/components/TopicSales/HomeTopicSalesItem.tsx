import React, { memo } from "react";
import { DiscountItem } from "../DiscountItem";
import { MoneyLineThrough } from "../MoneyLineThrough";
import { formatNumberDotSlice } from "@commons/formatMoney";
import type { IProduct } from "@typeRules/product";
import { Link } from "react-router-dom";
import { paths } from "@constants/routerPublic";
import { getLinkImageUrl } from "@commons/common";
import { Image } from "@components/Image";

type Props = {
  index: number;
  data: IProduct;
};

export const HomeTopicSalesItem = memo(({ index, data }: Props) => {
  return (
    <Link
      to={`${paths.memu.prefix}/${data.id}`}
      className="block overflow-hidden h-[330px] lg:h-[426px] relative rounded-[32px_0_32px_0]"
    >
      <div className="rounded-[32px_0_32px_0] z-[3] flex items-end absolute inset-[3px] overflow-hidden p-[24px]">
        <DiscountItem discount={Math.ceil(Number(data?.percent))} />
        <div className="absolute z-[1] bg-home_topic_sale_item inset-0" />
        <Image
          className="absolute object-cover inset-0 w-full h-full"
          alt={getLinkImageUrl(data?.linkMedia, 300, 300)}
          loading="lazy"
        />
        <div className="flex w-full flex-col justify-center relative text-text_white z-[3] items-center">
          <div className="flex items-center">
            <span className="text-_16 font-semibold lg:text-_18 lg:font-bold">
              {formatNumberDotSlice(Number(data?.pricePromotion))}
            </span>
            {data?.pricePromotion !== data?.price &&
            data?.pricePromotion.toString().length <= 8 ? (
              <MoneyLineThrough money={Number(data?.price)} />
            ) : null}
          </div>
          <h3 className="title-24 mt-2 line-clamp-1 text-text_white">
            {index}. {data?.name}
          </h3>
        </div>
      </div>
    </Link>
  );
});

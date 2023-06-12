import React, { memo } from "react";
import { DiscountItem } from "../DiscountItem";
import { MoneyLineThrough } from "../MoneyLineThrough";
import { formatNumberDot } from "@commons/formatMoney";

type Props = {
  index: number;
};

export const HomeTopicSalesItem = memo(({ index }: Props) => {
  return (
    <div className=" overflow-hidden h-[330px] lg:h-[426px] relative rounded-[32px_0_32px_0]">
      <div className="rounded-[32px_0_32px_0] z-[3] flex items-end absolute inset-[3px] overflow-hidden p-[24px]">
        <DiscountItem discount={30} />
        <div className="absolute z-[1] bg-home_topic_sale_item inset-0" />
        <img
          alt=""
          className="absolute inset-0 w-full h-full"
          src="https://s3-alpha-sig.figma.com/img/f7f7/fc4d/7e5a21b266c46fa9cb793387a81f8190?Expires=1687132800&Signature=HJdSIP-mXepiI~kYsTJnErXDM6BJByeuzuyf65TvZPP6pePGGJV~3RIqAu7pDITSfgMIWmAmxpqSjm-MlN38W2FXE24KABtr9EjA60AljdsnC1wSOVbLbnEA98psC5gnmwDnQe8I-GOsPpwtB-ucI7DEwaZkoXmeBYBPxIciCp3-c4jnjY8bcocsB7OpCq8sLhVDt3R-C2U7Ss8tLOx9sV4g1~WvJLgmJt2xf6YNIfZhs~-WAEZZN1gvxpNuwqW10Ts39nM6VlMVaFK-KAIeXl9iy1QLZUhcYWumwPlAJeHmFRw4baOv2brNHels9UAKeNRHAlOR7WB16k7nMuAbQQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
        <div className="flex w-full flex-col justify-center relative text-text_white z-[3] items-center">
          <div className="flex items-center">
            <span className="text-_16 font-semibold lg:text-_18 lg:font-bold">
              {formatNumberDot(600000)}
            </span>
            <MoneyLineThrough money={800000} />
          </div>
          <h3 className="title-24 mt-2 line-clamp-1 text-text_white">
            {index}. Kỳ Ngư Áp Chảo
          </h3>
        </div>
      </div>
    </div>
  );
});

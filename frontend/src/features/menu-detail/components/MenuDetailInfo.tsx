import { formatNumberDot } from "@commons/formatMoney";
import { DiscountItem } from "@features/home/components/DiscountItem";
import { MoneyLineThrough } from "@features/home/components/MoneyLineThrough";
import React from "react";
import { useTranslation } from "react-i18next";

export const MenuDetailInfo = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-[24px] lg:mt-0">
      <h3 className="text-_24 font-iCielBC_Cubano lg:title-32 text-secondary">Lẩu tôm hùm xanh sốt cay</h3>
      <div className="flex mt-2  items-center gap-x-[24px]">
        <div className="flex items-center">
          <span className="text-_16 lg:text-_24 font-bold">{formatNumberDot(600000)}</span>
          <MoneyLineThrough money={800000} className=" lg:text-_16" />
        </div>
        <DiscountItem className=" bg-text_EA222A !static hidden lg:flex" discount={30} />
      </div>
      <div className="mt-[16px] lg:mt-[24px]">
        <p className="hidden lg:block text-_16 font-semibold text-GreyPrimary">
          {t("common.info_product")}
        </p>

        <div
          className="text-_14 text-text_secondary"
          dangerouslySetInnerHTML={{
            __html:
              "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita animi consequuntur molestiae sit ratione est quisquam eligendi, necessitatibus rerum repellat fuga, reprehenderit, sunt dolorem rem sed explicabo architecto accusamus quas!",
          }}
        />
      </div>
    </div>
  );
};

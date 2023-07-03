import { ICArrowActive } from "@assets/icons/ICArrowActive";
import { ICHotline } from "@assets/icons/ICHotline";
import { SelectInput } from "@components/SelectInput";
import { useGetPlace } from "@features/dashboard/product/components/useGetPlace";
import type { PlaceType } from "@typeRules/place";
import clsx from "clsx";
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import InfiniteScroll from "react-infinite-scroll-component";

export const TopicPlaceItem = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { categories, fechData } = useGetPlace();
  const handleActiveIndex = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className="grid grid-cols-1 mt-[32px] xl:mt-[48px] lg:grid-cols-3 gap-[24px]">
      <div className="bg-white radius-tl-br flex flex-col h-[490px]">
        {/* <div className="px-[24px]">
          <label
            className="text-_14 font-semibold text-text_black mb-2 block"
            htmlFor="home.place.city_name"
          >
            {t("home.place.city_name")}
          </label>
          <SelectInput className="h-[48px]">
            <>
              <option value="" disabled>
                {" "}
                {t("home.place.chosse_place")}
              </option>
              <option value="Hà nội">Hà nội</option>
              <option value="Tp Hồ Chí Minh">Tp Hồ Chí Minh</option>
            </>
          </SelectInput>
        </div> */}
        <p className="text-_16 h-[60px]  px-[24px] font-semibold flex items-center">
          {t("home.place.list_base")}
        </p>
        <div className="flex-1 h-[430px] overflow-hidden">
          <TopicPlaceItemBase
            data={categories}
            onChange={handleActiveIndex}
            onFetch={fechData}
            activeIndex={activeIndex}
          />
        </div>
      </div>
      {categories.length ? (
        <div
          className=" lg:col-span-2 [&>iframe]:w-full [&>iframe]:h-full  h-[490px] radius-tl-br overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: categories[activeIndex].linkMap,
          }}
        />
      ) : null}
    </div>
  );
};

type PropsPlaceItemBase = {
  data: PlaceType[];
  onFetch: () => void;
  activeIndex: number;
  onChange: (index: number) => void;
};

export const TopicPlaceItemBase = memo(
  ({ data, onFetch, onChange, activeIndex }: PropsPlaceItemBase) => {
    return (
      <div id="place-home" className="h-full overflow-y-auto list-facilities">
        <InfiniteScroll
          hasMore
          loader={<></>}
          next={onFetch}
          dataLength={data.length}
          scrollableTarget="place-home"
        >
          {data.map((item, index) => {
            return (
              <div
                key={item.id}
                onClick={() => onChange(index)}
                className={clsx("flex items-center  px-[24px]", {
                  "bg-bg_F1F1F1 border-none px-[24px] !mx-0":
                    activeIndex === index,
                })}
              >
                <div
                  className={clsx(
                    "flex items-center w-full justify-between border-b border-br_E6E6E6",
                    {
                      "border-none": activeIndex === index,
                    }
                  )}
                >
                  <div className={clsx("py-[16px] cursor-pointer ")}>
                    <p className="text-_14 font-semibold text-GreyPrimary ">
                      {item.name}
                    </p>
                    <p className="text-_14 font-semibold text-text_secondary my-2">
                      {item.address}
                    </p>
                    <div className="flex items-center gap-x-[6px]">
                      <div>
                        <ICHotline />
                      </div>
                      <p className="text-_14 font-semibold text-text_secondary ">
                        {item.phone}
                      </p>
                    </div>
                  </div>

                  {activeIndex === index ? (
                    <span className="hidden lg:block">
                      <ICArrowActive />
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    );
  }
);

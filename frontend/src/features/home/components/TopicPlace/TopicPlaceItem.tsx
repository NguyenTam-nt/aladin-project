import { ICArrowActive } from "@assets/icons/ICArrowActive";
import { ICHotline } from "@assets/icons/ICHotline";
import { SelectInput } from "@components/SelectInput";
import { useGetPlace } from "@features/dashboard/product/components/useGetPlace";
import clsx from "clsx";
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import InfiniteScroll from "react-infinite-scroll-component";


export const TopicPlaceItem = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] mt-[48px] ">
      <div className="bg-white radius-tl-br py-[24px] flex flex-col h-[490px]">
        <div className="px-[24px]">
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
        </div>
        <p className="text-_16 px-[24px] font-semibold mt-[16px]">
          {t("home.place.list_base")}
        </p>
        <TopicPlaceItemBase />
      </div>
      <div className=" lg:col-span-2 h-[490px] radius-tl-br overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://s3-alpha-sig.figma.com/img/08d0/bf53/6af5e93a33a37c58b6e592bd8afe02f1?Expires=1687132800&Signature=JujBxeDfEuQyCsf3jvXwwsm9RQmhiqk6QgjSx9fvygIQPTlrte0kVp7M-4uX1mupR1jCf9Hchracec5jjNNz3Ou-6lMUfXllrhlxKUdnKEagNZKUvRa6DlpQUQ9te8dWgOkxbgmhHhiVn11M3Lq76y2IMR8sGr4rLnZNF3FYHB1BWCI3MMspxIBFxcEogXZ~qW12-yPMVnleceFUcYNWzJ77sXZU9zU4c2ZIVrF51DRYXOvg8icJqd4GKW70gs4ie1IaPqBXJqgAbjmrc2Zo41ATIyHIGzw6yqHJBvRORydrm9DkpsKxT6qvGHOuJQNSGrB973R4ZVImOPwUTwBiig__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
      </div>
    </div>
  );
};

export const TopicPlaceItemBase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { categories, fechData } = useGetPlace();
  const handleActiveIndex = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div id="place-home" className="flex-1 overflow-y-auto list-facilities">
      <InfiniteScroll
        hasMore
        loader={<></>}
        next={fechData}
        dataLength={categories.length}
        scrollableTarget="place-home"
      >
        {categories.map((item, index) => {
          return (
            <div
              key={item.id}
              onClick={() => handleActiveIndex(index)}
              className={clsx("flex items-center justify-between px-[24px]", {
                "bg-bg_F1F1F1 border-none px-[24px] !mx-0":
                  activeIndex === index,
              })}
            >
              <div
                className={clsx(
                  "py-[16px] cursor-pointer border-b border-br_E6E6E6",
                  {
                    "border-none": activeIndex === index,
                  }
                )}
              >
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
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

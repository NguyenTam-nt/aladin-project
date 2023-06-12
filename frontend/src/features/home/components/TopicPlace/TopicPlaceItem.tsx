import { ICHotline } from "@assets/icons/ICHotline";
import { SelectInput } from "@components/SelectInput";
import clsx from "clsx";
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";

const data = [
  {
    title: "Cơ sở số 1",
    address: "Số 225 Trần Phú, Hà Đông, Hà Nội",
    phone: "0365225425",
  },
  {
    title: "Cơ sở số 2",
    address: "Số 225 Trần Phú, Hà Đông, Hà Nội",
    phone: "0365225425",
  },
  {
    title: "Cơ sở số 3",
    address: "Số 225 Trần Phú, Hà Đông, Hà Nội",
    phone: "0365225425",
  },
  {
    title: "Cơ sở số 4",
    address: "Số 225 Trần Phú, Hà Đông, Hà Nội",
    phone: "0365225425",
  },
];

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
          <SelectInput className="h-[48px]" value="">
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
  const handleActiveIndex = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className="flex-1 overflow-y-auto list-facilities">
      {data.map((item, index) => {
        return (
          <div
            onClick={() => handleActiveIndex(index)}
            key={index}
            className={clsx(
              "py-[16px] cursor-pointer border-b border-br_E6E6E6 mx-[24px]",
              {
                "bg-bg_F1F1F1 mx-0 px-[24px] border-none": activeIndex === index,
              }
            )}
          >
            <p className="text-_14 font-semibold text-GreyPrimary ">
              {item.title}
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
        );
      })}
    </div>
  );
};

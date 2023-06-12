import { ICArowDown } from "@assets/icons/ICArowDown";
import { ICFacebook } from "@assets/icons/ICFacebook";
import { ICHotline } from "@assets/icons/ICHotline";
import { ICPhone } from "@assets/icons/ICPhone";
import { ICYoutubeContact } from "@assets/icons/ICYoutubeContact";
import { ICZalo } from "@assets/icons/ICZalo";
import { MenusRight } from "@components/MenusRight";
import { Colors } from "@constants/color";
import { TopicPlaceItemBase } from "@features/home/components/TopicPlace/TopicPlaceItem";
import React, { ReactNode } from "react";
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

type Props = {
  children: ReactNode;
};

export const ContactProvider = ({ children }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="fixed bottom-[288px] z-[11] gap-y-[24px] group-contact right-0 flex flex-col">
        <MenusRight />

        <button className="w-[54px] relative flex items-center justify-center h-[54px] rounded-[16px_0_16px_0] bg-bg_01A63E">
          <span>
            <ICPhone />
          </span>
          <div className="popup-with-arrow absolute top-0 right-[100%]">
            <div className="flex-1 shadow-lg overflow-x-hidden px-[16px] rounded-[16px_0_16px_0] absolute h-[328px] w-[220px] bg-white top-0 right-[15px] overflow-y-auto list-facilities">
              {data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="py-[16px] border-b border-br_E6E6E6"
                  >
                    <p className="text-_14 text-left font-semibold text-GreyPrimary ">
                      {item.title}
                    </p>
                    <div className="flex items-center mt-1 gap-x-[6px]">
                      <div>
                        <ICHotline />
                      </div>
                      <p className="text-_14  text-text_secondary ">
                        {item.phone}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </button>

        <button className="w-[54px] flex items-center justify-center h-[54px] rounded-[16px_0_16px_0] bg-bg_2196F3">
          <span>
            <ICZalo />
          </span>
        </button>

        <button className="w-[54px] flex items-center justify-center h-[54px] rounded-[16px_0_16px_0] bg-text_red">
          <span>
            <ICYoutubeContact />
          </span>
        </button>

        <button className="w-[54px] flex items-center justify-center h-[54px] rounded-[16px_0_16px_0] bg-bg_0068FF">
          <span>
            <ICFacebook width={11} height={20} color={Colors.text_white} />
          </span>
        </button>
      </div>
      {children}
    </>
  );
};

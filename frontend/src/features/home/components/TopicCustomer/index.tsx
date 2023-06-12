import React from "react";
import { TitleWithSeeAll } from "../TitleWithSeeAll";
import { TopicCustomerItem } from "./TopicCustomerItem";
import { ICHomeTopicCustomerRight } from "@assets/icons/ICHomeTopicCustomerRight";
import { ICHomeTopicCustomerLeft } from "@assets/icons/ICHomeTopicCustomerLeft";
import { paths } from "@constants/routerPublic";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";

export const TopicCustomer = () => {
  return (
    <div className="relative">
      {windownSizeWidth > withResponsive._1024 ? (
        <>
          <div className="absolute right-0 top-[-350px]">
            <ICHomeTopicCustomerRight />
          </div>
          <div className="absolute left-0 bottom-[-350px]">
            <ICHomeTopicCustomerLeft />
          </div>
        </>
      ) : null}
      <div className="w-rp lg:mt-0 relative">
        <TitleWithSeeAll
          title="home.customer.title"
          pathNavigate={paths.customer.prefix}
        />
        {windownSizeWidth > withResponsive._1024 ? (
          <TopicCustomerPC />
        ) : (
          <div className="mt-[24px] ">
            <SwiperComponent slidesPerView={windownSizeWidth > withResponsive._420 ? 2 : "auto"} spaceBetween={16}>
              {[1, 2, 4, 5, 6].map((_, index) => {
                return (
                  <SwiperSlide className="w-[70%] _420:w-full">
                    <div key={index} className="justify-center">
                      <TopicCustomerItem />
                    </div>
                  </SwiperSlide>
                );
              })}
            </SwiperComponent>
          </div>
        )}
      </div>
    </div>
  );
};

const TopicCustomerPC = () => {
  return (
    <div className="grid grid-cols-4 gap-[24px] [&>div]:flex [&>div]:flex-col [&>div]:gap-y-[24px]">
      <div className=" justify-center">
        <TopicCustomerItem />
      </div>
      <div className="mt-[100px]">
        <TopicCustomerItem />
        <TopicCustomerItem />
      </div>
      <div>
        <TopicCustomerItem />
        <TopicCustomerItem />
      </div>
      <div className=" justify-center">
        <TopicCustomerItem />
      </div>
    </div>
  );
};

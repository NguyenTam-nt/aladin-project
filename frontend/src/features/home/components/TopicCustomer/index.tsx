import React, { memo, useEffect, useState } from "react";
import { TitleWithSeeAll } from "../TitleWithSeeAll";
import { TopicCustomerItem } from "./TopicCustomerItem";
import { paths } from "@constants/routerPublic";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import type { IReview } from "@typeRules/index";
import { reviewService } from "@services/thanksCustomer";
import Image1 from "@assets/images/home/bgcustomer/bg_customer1.webp";
import Image2 from "@assets/images/home/bgcustomer/bg_customer2.webp";

export const TopicCustomer = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    reviewService
      .get_home({ page: 1, size: 6, sort: "lastModifiedDate,desc" })
      .then((data) => {
        setReviews(data.list);
      });
  }, []);

  return reviews.length ? (
    <div className="relative">
      {windownSizeWidth > withResponsive._1024 ? (
        <>
          <div className="absolute right-0 top-[-350px] select-none  pointer-events-none">
            <img className="w-full h-full" src={Image2} alt="" />
          </div>
          <div className="absolute  select-none  pointer-events-none  left-0 bottom-[-350px]">
            <img className="w-full h-full" src={Image1} alt="" />
          </div>
        </>
      ) : null}
      <div className="w-rp lg:mt-0 relative">
        <TitleWithSeeAll
          title="home.customer.title"
          pathNavigate={paths.customer.prefix}
        />
        {windownSizeWidth > withResponsive._1024 ? (
          <TopicCustomerPC data={reviews} />
        ) : (
          <div className="mt-[24px] ">
            <SwiperComponent
              slidesPerView={
                windownSizeWidth > withResponsive._420 ? 2 : "auto"
              }
              spaceBetween={16}
            >
              {reviews.map((item, index) => {
                return (
                  <SwiperSlide key={index} className="w-[70%] _420:w-full">
                    <div className="justify-center">
                      <TopicCustomerItem data={item} />
                    </div>
                  </SwiperSlide>
                );
              })}
            </SwiperComponent>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

type PropsPc = {
  data: IReview[];
};

const TopicCustomerPC = memo(({ data }: PropsPc) => {
  return (
    <div
      // ref={ref}
      className="grid grid-cols-4 gap-[24px] [&>div]:flex [&>div]:flex-col [&>div]:gap-y-[24px]"
    >
      <div className=" justify-center">
        {data?.[0] && (
          <div>
            <TopicCustomerItem data={data?.[0]} />{" "}
          </div>
        )}
      </div>
      <div className="mt-[100px]">
        {data?.[1] && (
          <div>
            <TopicCustomerItem data={data?.[1]} />{" "}
          </div>
        )}
        {data?.[2] && (
          <div>
            <TopicCustomerItem data={data?.[2]} />{" "}
          </div>
        )}
      </div>
      <div>
        {data?.[3] && (
          <div>
            <TopicCustomerItem data={data?.[3]} />{" "}
          </div>
        )}
        {data?.[4] && (
          <div>
            <TopicCustomerItem data={data?.[4]} />{" "}
          </div>
        )}
      </div>
      <div className=" justify-center">
        {data?.[5] && (
          <div>
            <TopicCustomerItem data={data?.[5]} />{" "}
          </div>
        )}
      </div>
    </div>
  );
});

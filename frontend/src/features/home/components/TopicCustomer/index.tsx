import React, { memo, useEffect, useState } from "react";
import { TitleWithSeeAll } from "../TitleWithSeeAll";
import { TopicCustomerItem } from "./TopicCustomerItem";
import { ICHomeTopicCustomerRight } from "@assets/icons/ICHomeTopicCustomerRight";
import { ICHomeTopicCustomerLeft } from "@assets/icons/ICHomeTopicCustomerLeft";
import { paths } from "@constants/routerPublic";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { SwiperComponent } from "@components/SwiperComponent";
import { SwiperSlide } from "swiper/react";
import type { IReview } from "@typeRules/index";
import { reviewService } from "@services/thanksCustomer";

export const TopicCustomer = () => {
  const [reviews, setReviews] = useState<IReview[]>([])

  useEffect(() => {
    reviewService.get_home({page: 1, size: 6, sort: "show,desc"}).then((data) => {
        setReviews(data)
    })
  }, [])

  return (
    reviews.length ? (
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
          <TopicCustomerPC data={reviews} />
        ) : (
          <div className="mt-[24px] ">
            <SwiperComponent slidesPerView={windownSizeWidth > withResponsive._420 ? 2 : "auto"} spaceBetween={16}>
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
    ) : null
  );
};

type PropsPc = {
  data: IReview[]
}

const TopicCustomerPC = memo(({data}:PropsPc) => {
  return (
    <div className="grid grid-cols-4 gap-[24px] [&>div]:flex [&>div]:flex-col [&>div]:gap-y-[24px]">
      <div className=" justify-center">
      {data?.[0] &&  <TopicCustomerItem data={data?.[0]} />}  
      </div>
      <div className="mt-[100px]">
      {data?.[1] &&  <TopicCustomerItem data={data?.[1]} />}  
      {data?.[2] &&  <TopicCustomerItem data={data?.[2]} />}  
      </div>
      <div>
      {data?.[3] &&  <TopicCustomerItem data={data?.[3]} />}  
      {data?.[4] &&  <TopicCustomerItem data={data?.[4]} />}  
      </div>
      <div className=" justify-center">
      {data?.[5] &&  <TopicCustomerItem data={data?.[5]} />}  
      </div>
    </div>
  );
})

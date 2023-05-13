import { SwiperComponent } from "@components/SwiperComponent";
import { TranslateContext } from "@contexts/Translation";
import React, { memo, useContext, useMemo } from "react";
import { Navigation } from "swiper";
import { SwiperSlide } from "swiper/react";

let data: { title: string; date: string; view_count: number; }[] = [];

for (let index = 0; index < 24; index++) {
  data.push({
    title:
      "Ultricies enim arcu arcu pulvinar egestas proin. Quisque suscipit amet",
    date: "25/12/2023",
    view_count: 25,
  });
}

type Props = {
  navigationNextRef: React.RefObject<HTMLDivElement>;
  navigationPrevRef: React.RefObject<HTMLDivElement>;
};

export const HomeTopicNoticeSlider = ({
  navigationNextRef,
  navigationPrevRef,
}: Props) => {
  const noticeCountItems = useMemo(() => {
    return Array.from({ length: Math.ceil(data.length / 6) }, (_, i) => i);
  }, []);
  return (
    <SwiperComponent
      slidesPerView={2}
      spaceBetween={24}
      navigationNextRef={navigationNextRef}
      navigationPrevRef={navigationPrevRef}
      loop={false}
      modules={[Navigation]}
    >
      {noticeCountItems.map((_, index) => {
        return (
          <SwiperSlide key={index}>
            {data.slice(index * 6, 6*(index+1)).map((item, index) => {
              return <HomeNoticeSliderItem key={index} />;
            })}
          </SwiperSlide>
        );
      })}
    </SwiperComponent>
  );
};

// type PropsSwiper = {
//     data: any[]

// }

// const SwiperSlideItem = memo(({data}:PropsSwiper) => {
//     return (
//         <SwiperSlide>
//         {data.map((item, index) => {
//           return <HomeNoticeSliderItem key={index} />;
//         })}
//       </SwiperSlide>
//     )
// })

const HomeNoticeSliderItem = memo(() => {
  const { t } = useContext(TranslateContext);
  return (
    <div className="pb-[8px] border-b-[1px] border-solid border-br_E9ECEF">
      <p className=" leading-[32px] line-clamp-1 text-_18 font-semibold text-text_primary">
        Ultricies enim arcu arcu pulvinar egestas proin. Quisque suscipit amet
      </p>
      <div className="flex items-center text-_14 text-bg_7E8B99">
        <span>25/12/2023</span>
        <div className="w-[1px] h-[16px] bg-br_E9ECEF mx-[8px]" />
        25 {t("button.view_count")}
      </div>
    </div>
  );
});

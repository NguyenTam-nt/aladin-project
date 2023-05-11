import React, { useContext, MouseEvent } from "react";
import { HomeHeaderGroup } from "./HomeHeaderGroup";
import News1 from "@assets/images/news1.png";
import News2 from "@assets/images/news2.png";
import News3 from "@assets/images/news3.png";
import News4 from "@assets/images/news4.png";
import News5 from "@assets/images/news5.png";
import { ICEye } from "@assets/icons/ICEye";
import { TranslateContext } from "@contexts/Translation";
import { Button } from "@components/Button";
import { ICArrowSeeMore } from "@assets/icons/ICArrowSeeMore";
import { Colors } from "@constants/color";
import { TextViewCount } from "@components/TextViewCount";
import { HomeTopicNewsItem } from "./HomeTopicNewsItem";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Grid } from "swiper";
import { ImageTranslation } from "../../../components/ImageTranslation";
import { width } from "@constants/container";
import { HomeTopicNewsSlider } from "./HomeTopicNewsSlider";

const data = [News1, News2, News3, News4, News5];

export const HomeTopicNews = () => {
  const { t } = useContext(TranslateContext);
  const navigationPrevRef = React.useRef<HTMLDivElement>(null);
  const navigationNextRef = React.useRef<HTMLDivElement>(null);

  const handleNext = () => {
    navigationNextRef.current?.click();
  };

  const handlePre = () => {
    navigationPrevRef.current?.click();
  };

  return (
    <div className="w-rp">
      <div className=" py-[120px]">
        <HomeHeaderGroup
          onPreClick={handlePre}
          onNextClick={handleNext}
          title="home.home_topic._news"
        />
        <div className="mt-[44px] grid grid-cols-[424px_1fr] gap-x-[24px]">
          <div className="flex flex-wrap gap-[24px] h-[274px]">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="h-[125px] min-w-[125px] max-w-[200px] overflow-hidden"
                >
                  <ImageTranslation link={item} />
                </div>
              );
            })}
          </div>
          <div>
            <HomeTopicNewsSlider navigationNextRef={navigationNextRef} navigationPrevRef={navigationPrevRef} />
            <div className="hidden" ref={navigationPrevRef} />
            <div className="hidden" ref={navigationNextRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

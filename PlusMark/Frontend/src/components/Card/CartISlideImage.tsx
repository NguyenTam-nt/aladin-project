import RightArrow from "@assets/iconElements/RightArrow";
import CricleButton from "@components/Buttons/CricleButton";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import SwiperComponent from "commons/SwiperComponent";
import React, { memo } from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";
interface Props {
  item: {
    name: string;
    images?: string[];
  };
}
const images = [
  "https://cdn-images.kiotviet.vn/newsport700/f289fdb9aa724218a4ba44110af7a27c.jpg",
  "https://cdn-images.kiotviet.vn/newsport700/5f968997b68640a3a705b546e4291499.jpg",
  "https://supershop.vn/api/image/1691138373713",
  "https://supershop.vn/api/image/1691149478543",
];
const CartISlideImage = memo(({ item }: Props) => {
  const {
    navigationPrevRef,
    navigationNextRef,
    handleNext,
    handlePre,
    NavigationElement,
    currentIndex,
    onActiveIndexChange,
    activeThumb,
    setThumbActive,
  } = useSwiperNavigationRef();

  return (
    <div className="p-3 lg:pt-6 bg-white flex flex-col sm:gap-4 gap-2 lg:rounded-lg rounded-sm">
      <div className="flex items-center justify-between xl:my-1 ">
        <span className="font-bold xl:text-header2 text-xl text-gray-400">
          {currentIndex + 1 < 10 && "0"}
          {currentIndex + 1}
        </span>
        <CricleButton
          // disabled={loading || currentPage >= totalPage}
          className="xl:w-12 xl:h-12 w-spc30 h-spc30"
          onClick={() => handleNext()}
          icon={<RightArrow />}
        />
      </div>
      <p className="xl:text-lg text-lg font-bold">{item.name}</p>
      <div className="xl:h-[280px] lg:h-[200px] md:h-[200px] sm:h-[140px] h-[105px]">
        <SwiperComponent
          onActiveIndexChange={onActiveIndexChange}
          navigationNextRef={navigationNextRef}
          navigationPrevRef={navigationPrevRef}
          slidesPerView={1}
          loop={true}
          modules={[Navigation]}
          className="w-full h-full"
        >
          {images.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={item}
                  alt=""
                  className="rounded-[12px] w-full h-full"
                />
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
        {NavigationElement}
      </div>
    </div>
  );
});

export default CartISlideImage;

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
    <div className="p-3 pt-6 bg-white flex flex-col gap-4 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="font-bold text-header2 text-gray-400">
          {currentIndex + 1 < 10 && "0"}
          {currentIndex + 1}
        </span>
        <CricleButton
          // disabled={loading || currentPage >= totalPage}
          onClick={() => handleNext()}
          icon={<RightArrow />}
        />
      </div>
      <p className="text-lg font-bold">{item.name}</p>
      <div className="min-h-spc280">
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
                <img src={item} alt="" className="rounded-[12px]" />
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

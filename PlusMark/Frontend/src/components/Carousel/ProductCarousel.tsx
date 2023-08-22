import PrevIconElm from "@assets/iconElements/PrevIconElm";
import { NextArrowIcon, PrevArrowIcon } from "@assets/icons";
import CricleButton from "@components/Buttons/CricleButton";
import CardItem from "@components/Card/CardItem";
import ProductCard from "@components/Card/ProductCard";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import { ProductItem } from "@services/ProductServices";
import clsx from "clsx";
import SwiperComponent from "commons/SwiperComponent";
import { useCallback, useRef } from "react";
import { Autoplay, Grid, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  product: ProductItem[]
}

const ProductCarousel = ({ product }: Props) => {
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
    <>
      <div className="relative">
        <CricleButton
          onClick={() => handlePre()}
          className="absolute -left-[5%] top-1/2 -translate-y-1/2 z-10 "
          icon={<PrevIconElm />}
        />
        <SwiperComponent
          onActiveIndexChange={onActiveIndexChange}
          navigationNextRef={navigationNextRef}
          navigationPrevRef={navigationPrevRef}
          slidesPerView={4}
          modules={[Grid, Autoplay, Pagination, Navigation]}
          className={clsx("w-full h-full", {})}
          spaceBetween={26}
          autoplay={true}
          loop
        >
          {(product ?? []).map((item: any, index: number) => {
            return (
              <SwiperSlide key={index} className={clsx("")}>
                <CardItem description={`${index}`} />
              </SwiperSlide>
            );
          })}
        </SwiperComponent>

        <CricleButton
          onClick={() => handleNext()}
          className={
            "absolute -right-[5%] top-1/2 -translate-y-1/2 z-10 "
          }
        />
        {NavigationElement}
      </div>
    </>
  );
};

export default ProductCarousel;

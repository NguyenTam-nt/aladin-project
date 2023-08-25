import PrevIconElm from "@assets/iconElements/PrevIconElm";
import { NextArrowIcon, PrevArrowIcon } from "@assets/icons";
import CricleButton from "@components/Buttons/CricleButton";
import CardItem from "@components/Card/CardItem";
import ProductCard from "@components/Card/ProductCard";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import useViewport from "@hooks/useViewPort";
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

  const { width } = useViewport();
  return (
    <>
      <div className="relative">
        {
          width >= 1536 && (
            <CricleButton
              onClick={() => handlePre()}
              className="absolute 3xl:-left-[5%] 2xl:-left-[6%] top-1/2 -translate-y-1/2 z-10 "
              icon={<PrevIconElm />}
            />
          )
        }
        <SwiperComponent
          onActiveIndexChange={onActiveIndexChange}
          navigationNextRef={navigationNextRef}
          navigationPrevRef={navigationPrevRef}
          slidesPerView={width >= 1280 ? 4 : width >= 750 ? 3 : 2}
          modules={[Grid, Autoplay, Pagination, Navigation]}
          className={clsx("w-full h-full", {})}
          grid={{ rows: width >= 1024 ? 1 : 2, fill: "row" }}
          spaceBetween={width >= 1024 ? 26 : 8}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
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
        {
          width >= 1536 && (
            <CricleButton
              onClick={() => handleNext()}
              className={
                "absolute 3xl:-right-[5%] 2xl:-right-[7%] top-1/2 -translate-y-1/2 z-10 "
              }
            />
          )
        }

        {NavigationElement}
      </div>
    </>
  );
};

export default ProductCarousel;

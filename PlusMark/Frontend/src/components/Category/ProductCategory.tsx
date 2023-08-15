import { NextArrowIcon, PrevArrowIcon } from "@assets/icons";
import ProductCard from "@components/Card/HotSaleProductCard";
import TopicFlag from "@components/Flag/TopicFlag";
import { useCallback, useRef } from "react";
import { Autoplay, Grid, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductCategory = () => {
  const slideRef = useRef<any>(null);
  const nextSlide = useCallback(() => {
    if (slideRef.current) {
      slideRef.current.swiper.slideNext();
    }
  }, []);
  const prevSlide = useCallback(() => {
    if (slideRef.current) {
      slideRef.current.swiper.slidePrev();
    }
  }, []);
  return (
    <div className="py-2">
      <TopicFlag title="ĐIỆN THOẠI" />

      <div className="container relative py-9">
        <button className="absolute -left-20 top-1/2" onClick={prevSlide}>
          <PrevArrowIcon className="fill-icon" />
        </button>
        <button className="absolute -right-20 top-1/2" onClick={nextSlide}>
          <NextArrowIcon className="fill-icon" />
        </button>
        <Swiper
          ref={slideRef}
          modules={[Autoplay, Navigation, Grid]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          slidesPerView={5}
          grid={{ rows: 2, fill: "row" }}
          spaceBetween={20}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5].map(
            (it, idx) => (
              <SwiperSlide className="py-2" key={idx}>
                {/* <ProductCard /> */}
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
      <div className="container">
        <button className="btn text-icon shadow text-normal1">Xem tất cả</button>
      </div>
    </div>
  );
};

export default ProductCategory;

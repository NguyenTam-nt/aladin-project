import { NextArrowIcon, PrevArrowIcon } from "@assets/icons";
import ProductCard from "@components/Card/ProductCard";
import { ProductItem } from "@services/ProductServices";
import { useCallback, useRef } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  product: ProductItem[] 
}

const ProductCarousel = ({product}: Props) => {
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
    <div>
      <div className="relative py-9">
        <button className="absolute hidden sm:block -left-10 top-1/2 -translate-y-2/4" onClick={prevSlide}>
          <PrevArrowIcon className="fill-text w-5" />
        </button>
        <button className="absolute hidden sm:block -right-10 top-1/2 -translate-y-2/4" onClick={nextSlide}>
          <NextArrowIcon className="fill-text w-5" />
        </button>
        <Swiper
          modules={[Autoplay, Navigation]}
          ref={slideRef}
          spaceBetween={18}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            596: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {product.map((it, idx) => (
            <SwiperSlide className="xl:p-2" key={idx}>
              <ProductCard product={it} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCarousel;

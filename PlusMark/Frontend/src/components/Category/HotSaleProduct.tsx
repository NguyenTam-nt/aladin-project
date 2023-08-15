import { NextArrowIcon, PrevArrowIcon } from "@assets/icons";
import HotProductCard from "@components/Card/HotProductCard";
import ProductCard from "@components/Card/HotSaleProductCard";
import TopicFlag from "@components/Flag/TopicFlag";
import { useCallback, useRef } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  title?: string;
  data?: { [key: string]: any };
}

const HotSaleProduct = (props: Props) => {
  const { data, title } = props;

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
    <div className="bg-icon pt-20">
      <TopicFlag color="main" title="Sale cuối tuần" highlight />
      <div className="container relative py-9">
        <button className="absolute -left-20 top-1/2" onClick={prevSlide}>
          <PrevArrowIcon />
        </button>
        <button className="absolute -right-20 top-1/2" onClick={nextSlide}>
          <NextArrowIcon />
        </button>
        <Swiper
          modules={[Autoplay, Navigation]}
          ref={slideRef}
          spaceBetween={18}
          slidesPerView={4}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((it, idx) => (
            <SwiperSlide className="p-2" key={idx}>
              {/* <ProductCard /> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {true && <HotProductCard />}
    </div>
  );
};

export default HotSaleProduct;

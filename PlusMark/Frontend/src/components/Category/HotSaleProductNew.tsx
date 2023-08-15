import { NextArrowIcon, PrevArrowIcon } from "@assets/icons";
import HotSaleProductCard from "@components/Card/HotSaleProductCard";
import TopicFlagNew from "@components/Flag/TopicFlagNew";
import useI18n from "@hooks/useI18n";
import CategoryProductServices from "@services/CategoryProductServices";
import ProductServices, { ProductItem } from "@services/ProductServices";
import { useCallback, useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  title?: string;
}

const HotSaleProductNew = (props: Props) => {
  const { t } = useI18n()
  const [hotSold, setHotSold] = useState<ProductItem[]>([])
  const { title } = props;

  useEffect(() => {
    try {
      // ProductServices.getSale()
      //   .then(data => {
      //     setHotSold(data.data)
      //   })

      let request = {
        saleMin: 1,
        saleMax: 100
      }
  
      CategoryProductServices.search(request, 0, 20, "saleMax,desc", new AbortController())
        .then(data => {
          setHotSold(data)
          return data
        })

    } catch (error) {
      
    }
      
  }, [])

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
    hotSold && hotSold.length > 0 ? 
    <div className="border-b-[1px]">
      <div className="pt-8 gl:pt-20">
        <TopicFlagNew color="main" title={t("homepage.hot_sale.title")} highlight items={[]} />
        <div className="container relative py-9">
          <button className="absolute hidden lg:block lg:-left-14 2lg:-left-8 xl:-left-16 1.5xl:-left-8 2xl:-left-16 2.5xl:-left-8 3xl:-left-20  top-1/2 -translate-y-2/4" onClick={prevSlide}>
            <PrevArrowIcon className="fill-black" />
          </button>
          <button className="absolute hidden lg:block lg:-right-14 2lg:-right-8 xl:-right-16 1.5xl:-right-8 2xl:-right-16 2.5xl:-right-8 3xl:-right-20 top-1/2 -translate-y-2/4" onClick={nextSlide}>
            <NextArrowIcon className="fill-black" />
          </button>
          <Swiper
            className=""
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
            {hotSold.map((it, idx) => (
              <SwiperSlide className="p-2 h-full" key={idx}>
                <HotSaleProductCard  data={it}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div> : <></>
  );
};

export default HotSaleProductNew;

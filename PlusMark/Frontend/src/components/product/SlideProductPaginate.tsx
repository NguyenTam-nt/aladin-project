import PrevIconElm from "@assets/iconElements/PrevIconElm";
import CartISlideImage from "@components/Card/CartISlideImage";
import TitleSession from "@components/common/TitleSession";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import ProductServices, { ProductItem } from "@services/ProductServices";
import clsx from "clsx";
import { PaginationCompt } from "commons/Paginnation";
import SwiperComponent from "commons/SwiperComponent";
import { memo, useEffect, useState } from "react";
import Swiper, { Autoplay, Grid, Navigation, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";

interface Props {
  size?: number;
  row?: number;
  classPaginate?: string;
  breackPoin?: any;
  slideItems: ProductItem[];
}
const breack = {
  768: {
    slidesPerView: 3,
    spaceBetween: 26,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 26,
  },
};
const SlideProductPaginate = memo(
  ({ size, row, breackPoin, classPaginate, slideItems }: Props) => {
    const [listproducts, setListProducts] = useState<ProductItem[]>([]);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const {
      navigationPrevRef,
      navigationNextRef,
      handleNext,
      handlePre,
      NavigationElement,
      currentIndex,
      onActiveIndexChange,
      activeThumb,
    } = useSwiperNavigationRef();
    return (
      <div className={clsx("relative")}>
        <SwiperComponent
          onActiveIndexChange={onActiveIndexChange}
          navigationNextRef={navigationNextRef}
          navigationPrevRef={navigationPrevRef}
          breakpoints={breackPoin ? breackPoin : breack}
          slidesPerView={2}
          modules={[Autoplay, Pagination, Navigation]}
          className={clsx("w-full h-full", {})}
          spaceBetween={12}
        >
          {slideItems.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <CartISlideImage key={index} item={{ name: "Sức khỏe" }} />
              </SwiperSlide>
            );
          })}
        </SwiperComponent>

        {slideItems.length > 0 && <>{NavigationElement}</>}
      </div>
    );
  }
);

export default SlideProductPaginate;

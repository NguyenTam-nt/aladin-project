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
}
const SlideProductPaginate = memo(({ size = 4, row = 1 }: Props) => {
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
    setThumbActive,
  } = useSwiperNavigationRef();
  const callApi = async () => {
    try {
      setLoading(true);
      const result = await ProductServices.getListNewProducts({
        page: currentPage,
        size: size,
      });
      setListProducts(result.data);
      setTotalPage(Math.ceil(result.total / 4));
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    callApi();
  }, [currentPage]);

  return (
    <div className="relative product_box">
      <div className="flex sc480:flex-row flex-col sc480:items-center w-full justify-between gap-5 mb-6">
        <TitleSession text="text.section.new" className="text-white" />
        <PaginationCompt
          currentPage={currentPage}
          // totalPages={totalPage}
          totalPages={20}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <SwiperComponent
        onActiveIndexChange={onActiveIndexChange}
        navigationNextRef={navigationNextRef}
        navigationPrevRef={navigationPrevRef}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        slidesPerView={2}
        modules={[Autoplay, Pagination, Navigation]}
        className={clsx("w-full h-full", {})}
        spaceBetween={8}
      >
        {listproducts.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <CartISlideImage key={index} item={{ name: "Sức khỏe" }} />
            </SwiperSlide>
          );
        })}
      </SwiperComponent>

      {totalPage > 0 && <>{NavigationElement}</>}
    </div>
  );
});

export default SlideProductPaginate;

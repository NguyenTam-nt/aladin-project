import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import SwiperComponent from "commons/SwiperComponent";
import Swiper, { Autoplay, Grid, Navigation, Pagination } from "swiper";
import React, { memo, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import CricleButton from "@components/Buttons/CricleButton";
import PrevIconElm from "@assets/iconElements/PrevIconElm";
import clsx from "clsx";
import ProductServices, { ProductItem } from "@services/ProductServices";
import LoadingPage from "@components/LoadingPage";
import CartISlideImage from "@components/Card/CartISlideImage";
import TitleSession from "@components/common/TitleSession";
import NextIcon from "@assets/iconElements/NextIcon";

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

  const handleAddState = () => {
    if (currentIndex + size >= listproducts.length) {
      if (currentPage >= totalPage) return;
      if (currentIndex + size == listproducts.length)
        return setCurrentPage(currentPage + 1);
    }
    return;
  };

  const callApi = async () => {
    try {
      setLoading(true);
      const result = await ProductServices.getListNewProducts({
        page: currentPage,
        size: size,
      });
      setListProducts([...listproducts, ...result.data]);
      setTotalPage(Math.ceil(result.total / 4));
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    callApi();
  }, [currentPage]);

  return (
    <div className="relative product_box">
      <div className="flex items-center justify-between mb-6">
        <TitleSession text="a" />
        <div className="flex items-center h-10 gap-x-6">
          <span onClick={() => handlePre()}>
            <PrevIconElm />
          </span>

          <div className="w-spc300 h-10 flex items-center gap-1 overflow-y-scroll hidden_scroll bg-white">
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
            <span className="flex items-center justify-center h-full w-10">
              01
            </span>
          </div>
          <span onClick={() => handleNext(handleAddState)}>
            <NextIcon />
          </span>

          {/* <CricleButton
            disabled={loading || currentPage >= totalPage}
            onClick={() => handleNext(handleAddState)}
            icon={loading ? <LoadingPage width={20} size={2} /> : null}
            className={"" + loading && "!cursor-not-allowed !opacity-3"}
          /> */}
        </div>
      </div>
      <SwiperComponent
        onActiveIndexChange={onActiveIndexChange}
        navigationNextRef={navigationNextRef}
        navigationPrevRef={navigationPrevRef}
        slidesPerView={4}
        modules={[Grid, Autoplay, Pagination, Navigation]}
        className={clsx("w-full h-full", {})}
      >
        {listproducts.map((item: any, index: number) => {
          return (
            <SwiperSlide
              key={index}
              className={clsx("", {
                "px-3": index != 0 || index + 1 != listproducts.length,
                "pr-3": index == 0,
                "pl-3": index + 1 == listproducts.length,
              })}
            >
              <CartISlideImage item={{ name: "Sức khỏe" }} />
            </SwiperSlide>
          );
        })}
      </SwiperComponent>

      {totalPage > 0 && <>{NavigationElement}</>}
    </div>
  );
});

export default SlideProductPaginate;

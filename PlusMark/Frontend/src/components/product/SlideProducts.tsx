import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import SwiperComponent from "commons/SwiperComponent";
import Swiper, { Autoplay, Grid, Navigation, Pagination } from "swiper";
import React, { memo, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import CardItem from "@components/Card/CardItem";
import CricleButton from "@components/Buttons/CricleButton";
import PrevIconElm from "@assets/iconElements/PrevIconElm";
import clsx from "clsx";
import ProductServices, { ProductItem } from "@services/ProductServices";
import LoadingPage from "@components/LoadingPage";

interface Props {
  typeSlide: "new" | "sale" | "viewed" | "sameCategory";
  size?: number;
  row?: number;
  gap?: number;
}
const SlideProducts = memo(({ typeSlide, size = 4, row, gap = 24 }: Props) => {
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
  const valueExpression = row
    ? currentIndex * 2 + size * row
    : currentIndex + size;
  const handleAddState = () => {
    if (valueExpression >= listproducts.length) {
      if (currentPage >= totalPage) return;
      if (valueExpression == listproducts.length)
        return setCurrentPage(currentPage + 1);
    }
    return;
  };

  const callApi = async () => {
    try {
      setLoading(true);
      const result =
        typeSlide == "new"
          ? await ProductServices.getListNewProducts({
              page: currentPage,
              size: row ? size * row : size,
            })
          : null;
      if (result) {
        setListProducts([...listproducts, ...result.data]);
        setTotalPage(Math.ceil(result.total / (row ? size * row : size)));
        setTotalElements(result.total);
      }
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    callApi();
  }, [currentPage]);
  return (
    <div className="relative">
      <SwiperComponent
        onActiveIndexChange={onActiveIndexChange}
        navigationNextRef={navigationNextRef}
        navigationPrevRef={navigationPrevRef}
        slidesPerView={size}
        grid={row ? { rows: row, fill: "row" } : undefined}
        modules={[Grid, Autoplay, Pagination, Navigation]}
        className={clsx("w-full h-full", {})}
        spaceBetween={gap}
      >
        {listproducts.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index} className={clsx("", { "h-1/2": row })}>
              <CardItem description={`${index}`} />
            </SwiperSlide>
          );
        })}
      </SwiperComponent>

      {totalPage > 0 && (
        <>
          {currentIndex != 0 && (
            <CricleButton
              onClick={() => handlePre()}
              className="absolute -left-[5%] top-1/2 -translate-y-1/2 z-10 "
              icon={<PrevIconElm />}
            />
          )}
          {valueExpression < totalElements && (
            <CricleButton
              disabled={loading || currentPage >= totalPage}
              onClick={() => handleNext(handleAddState)}
              icon={loading ? <LoadingPage width={20} size={2} /> : null}
              className={
                "absolute -right-[5%] top-1/2 -translate-y-1/2 z-10 " +
                (loading && "!cursor-not-allowed !opacity-3")
              }
            />
          )}
          {NavigationElement}
        </>
      )}
    </div>
  );
});

export default SlideProducts;

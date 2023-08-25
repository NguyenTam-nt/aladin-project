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
import useViewport from "@hooks/useViewPort";
import DynamicButton from "@components/Buttons/DynamicButton";

interface Props {
  typeSlide: "new" | "sale" | "viewed" | "sameCategory";
  size?: number;
  numberPreview?: number;
  row?: number;
  breackPoin?: any;
}
const initialBreak = {
  480: {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  // 768: {
  //   slidesPerView: 4,
  //   spaceBetween: 26,
  // },
  // 768: {
  //   slidesPerView: 4,
  //   spaceBetween: 26,
  // },
  768: {
    slidesPerView: 4,
    spaceBetween: 26,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 26,
  },
  1536: {
    slidesPerView: 5,
    spaceBetween: 26,
  },
};

const SlideProducts = memo(
  ({ typeSlide, size = 4, row, breackPoin = initialBreak }: Props) => {
    const { width } = useViewport();
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
    const countPage = 12;
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
                size: countPage,
              })
            : null;
        if (result) {
          setListProducts([...listproducts, ...result.data]);
          setTotalPage(Math.ceil(result.total / countPage));
          setTotalElements(result.total);
        }
        setLoading(false);
      } catch (error) {}
    };

    useEffect(() => {
      callApi();
    }, [currentPage]);
    if (width < 1280)
      return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:gap-6 sc480:gap-5 gap-3">
            {listproducts.map((item: any, index: number) => {
              return <CardItem key={index} description={`${index}`} />;
            })}
          </div>
          {currentPage < totalPage && (
            <div className="flex justify-center mt-5">
              <DynamicButton
                text="button.see_more"
                className="w-spc136"
                onClick={() => {
                  currentPage < totalPage && setCurrentPage(currentPage + 1);
                }}
              />
            </div>
          )}
        </>
      );
    return (
      <div className="relative 2xl:mx-auto xl:block hidden">
        <SwiperComponent
          onActiveIndexChange={onActiveIndexChange}
          navigationNextRef={navigationNextRef}
          navigationPrevRef={navigationPrevRef}
          slidesPerView={size}
          grid={row ? { rows: row, fill: "row" } : undefined}
          modules={[Grid, Autoplay, Pagination, Navigation]}
          className={clsx("w-full h-full", {})}
          spaceBetween={8}
          breakpoints={breackPoin}
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
  }
);

export default SlideProducts;

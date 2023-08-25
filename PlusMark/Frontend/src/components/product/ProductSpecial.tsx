import React, { memo, useEffect, useState } from "react";
import SlideProductPaginate from "./SlideProductPaginate";
import clsx from "clsx";
import ProductServices, { ProductItem } from "@services/ProductServices";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import TitleSession from "@components/common/TitleSession";
import { PaginationCompt } from "commons/Paginnation";

interface Props {
  isbg?: boolean;
  className?: string;
}

const ProductSpecial = memo(({ isbg = true, className }: Props) => {
  const [listproducts, setListProducts] = useState<ProductItem[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const callApi = async () => {
    try {
      setLoading(true);
      const result = await ProductServices.getListNewProducts({
        page: currentPage,
        size: 12,
      });
      setListProducts(result.data);
      setTotalPage(Math.ceil(result.total / 4));
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    callApi();
  }, [currentPage]);

  const breackPoinSlide = {
    390: {
      slidesPerView: 2.6,
      spaceBetween: 8,
    },
    480: {
      slidesPerView: 3.6,
      spaceBetween: 8,
    },
    640: {
      slidesPerView: 3.6,
      spaceBetween: 12,
    },
    992: {
      slidesPerView: 4.6,
      spaceBetween: 8,
    },
    1024: {
      slidesPerView: 4.6,
      spaceBetween: 12,
    },
    1280: {
      slidesPerView: 4.6,
      spaceBetween: 20,
    },
  };
  const breackPoinIntro = {
    390: {
      slidesPerView: 2.4,
      spaceBetween: 8,
    },
    480: {
      slidesPerView: 3.4,
      spaceBetween: 8,
    },
    640: {
      slidesPerView: 3.4,
      spaceBetween: 12,
    },
    992: {
      slidesPerView: 4.4,
      spaceBetween: 8,
    },
    1024: {
      slidesPerView: 4.4,
      spaceBetween: 12,
    },
    1280: {
      slidesPerView: 3.4,
      spaceBetween: 20,
    },
    1536: {
      slidesPerView: 3.4,
      spaceBetween: 20,
    },
  };

  return (
    <div className={className}>
      <div className="relative min-h-spc300 pt-5 mb-spc50">
        <div
          className={clsx("absolute top-0 right-0 w-full  -z--1", {
            "bg-footer h-2/3": isbg,
            "bg-aqua-aq03 min-h-[340px] h-3/4": !isbg,
          })}
        ></div>
        <div className="flex relative z-40 items-center justify-between product_box">
          <TitleSession
            isBox={true}
            text="text.section.new"
            className="text-white"
          />
          <PaginationCompt
            currentPage={1}
            totalPages={20}
            setCurrentPage={() => {}}
          />
        </div>
        <div
          className={clsx("z-40 relative product_left pt-[22px]", {
            "flex flex-wrap justify-between": !isbg,
          })}
        >
          {!isbg && (
            <div className="xl:pl-1 xl:w-[340px] w-full">
              <p className="text-2xl font-bold text-main mb-5">
                모아밥솥 12A032 1.2L
              </p>
              <ul className="flex flex-col gap-3 list-disc pl-6">
                <li>1.2L 용량으로 2~4인이 사용하기에 적합합니다</li>
                <li>
                  건강을 위해 안전한 고품질 붙지 않는 입히는 알루미늄 합금 남비.
                </li>
                <li>
                  모던하고 고급스러운 디자인, 우아한 색상, 심플하고 편리한
                  컨트롤 버튼.
                </li>
                <li>
                  다방면의 보온으로 밥맛이 좋아지고 더 오래 보온됩니 다방면의
                  보온으로 밥맛이 좋아지고 더 오래 보온됩니
                </li>
                <li>일본 기술 - 베트남산!</li>
              </ul>
            </div>
          )}
          <div
            className={clsx("", {
              "xl:w-[calc(100%_-_360px)] w-full ": !isbg,
              "pt-[22px]": !isbg,
            })}
          >
            <SlideProductPaginate
              slideItems={listproducts}
              breackPoin={isbg ? breackPoinSlide : breackPoinIntro}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductSpecial;

import React, { memo, useEffect, useState } from "react";
import SlideProductPaginate from "./SlideProductPaginate";
import clsx from "clsx";
import ProductServices, { ProductItem } from "@services/ProductServices";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import TitleSession from "@components/common/TitleSession";
import { PaginationCompt } from "commons/Paginnation";

interface Props {
  isbg?: boolean;
}

const ProductSpecial = memo(({ isbg = true }: Props) => {
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
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  };

  return (
    <div
      className={clsx("w-full", {
        "min-h-spc400 relative  first-line:": isbg,
      })}
    >
      {isbg && (
        <div className="h-[390px] bg-footer absolute top-0 w-full z-0"></div>
      )}
      <div
        className={clsx(
          "flex sc480:flex-row flex-col sc480:items-center justify-between gap-5 relative pt-4",
          { " product_box  mb-5": isbg, "  w-full": !isbg }
        )}
      >
        <TitleSession text="text.section.new" className="text-white" />
        <PaginationCompt
          currentPage={currentPage}
          totalPages={20}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className={clsx("py-5", { " product_box": isbg })}>
        <SlideProductPaginate
          slideItems={listproducts}
          breackPoin={isbg ? null : breackPoinSlide}
        />
      </div>
    </div>
  );
});

export default ProductSpecial;

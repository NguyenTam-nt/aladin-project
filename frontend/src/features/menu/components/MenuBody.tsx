import React from "react";
import { useTranslation } from "react-i18next";
import { MenuBodyFilterByCategory } from "./MenuBodyFilterByCategory";
import { MenuBofyFilterBySort } from "./MenuBofyFilterBySort";
import { MenuListData } from "./MenuListData";
import { Pagination } from "@components/Paginnation";
import { usePagination } from "@hooks/usePagination";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { MenuBodyFilterMobile } from "./MenuBodyFilterMobile";
import { useGetProduct } from "@features/dashboard/product/components/useGetProduct";

export const MenuBody = () => {
  const { t } = useTranslation();
  const {
    products,
    loading,
    handleChangeCategory,
    totalPages,
    currentPage,
    setCurrentPage,
    handleChangeSort,
    sortId
  } = useGetProduct();


  return (
    <div className="w-rp py-[40px] lg:py-[120px]">
      <div className="flex gap-x-[78px]">
        {windownSizeWidth > withResponsive._1024 ? (
          <div className="w-[246px]">
            <MenuBodyFilterByCategory onChangeCategory={handleChangeCategory} />
          </div>
        ) : null}
        <div className="flex-1">
          {windownSizeWidth > withResponsive._1024 ? (
            <MenuBofyFilterBySort sort={sortId} onChangeSort={handleChangeSort} />
          ) : (
            <MenuBodyFilterMobile />
          )}
          <MenuListData data={products?.list || []} />
          <div className="flex lg:justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              limit={windownSizeWidth > withResponsive._1024 ? 5 : 4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

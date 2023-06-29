import React from "react";
import { useTranslation } from "react-i18next";
import { MenuBodyFilterByCategory } from "./MenuBodyFilterByCategory";
import { MenuBofyFilterBySort } from "./MenuBofyFilterBySort";
import { MenuListData } from "./MenuListData";
import { Pagination } from "@components/Paginnation";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { MenuBodyFilterMobile } from "./MenuBodyFilterMobile";
import { useGetProduct } from "@features/dashboard/product/components/useGetProduct";
import { useCategoryFilter } from "@features/dashboard/product/components/useCategoryFilter";

export const MenuBody = () => {
  const {
    products,
    loading,
    handleChangeCategory,
    totalPages,
    currentPage,
    setCurrentPage,
    handleChangeSort,
    sortId,
  } = useGetProduct( windownSizeWidth > withResponsive._1280 ? 9 : 8, "");

  const {
    handleChangeCategoryParent,
    handleSelectCategorySub,
    categories,
    indexChild,
    indexParent,
    handleClear
  } = useCategoryFilter({ onChange: handleChangeCategory, isAll: true });

  return (
    <div className="w-rp py-[40px] lg:py-[120px]">
      <div className="flex gap-x-[78px]">
        {windownSizeWidth > withResponsive._1024 ? (
          <div className="w-[246px]">
            <MenuBodyFilterByCategory
              categories={categories}
              handleChangeCategoryParent={handleChangeCategoryParent}
              handleSelectCategorySub={handleSelectCategorySub}
              indexChild={indexChild}
              indexParent={indexParent}
              handleClear={handleClear}
            />
          </div>
        ) : null}
        <div className="flex-1">
          {windownSizeWidth > withResponsive._1024 ? (
            <MenuBofyFilterBySort
            handleClear={handleClear}
              sort={sortId}
              nameP={
                categories.length && indexParent !== -1
                  ? categories[indexParent].name
                  : ""
              }
              nameC={
                categories.length && indexChild !== -1 && indexParent !== -1
                  ? categories[indexParent]?.listCategoryChild?.length
                    ? categories[indexParent].listCategoryChild?.[indexChild]
                        .name
                    : ""
                  : ""
              }
              onChangeSort={handleChangeSort}
            />
          ) : (
            <MenuBodyFilterMobile
              categories={categories}
              handleChangeCategoryParent={handleChangeCategoryParent}
              handleSelectCategorySub={handleSelectCategorySub}
              indexChild={indexChild}
              indexParent={indexParent}
              handleClear={handleClear}
              nameP={
                categories.length && indexParent !== -1
                  ? categories[indexParent].name
                  : ""
              }
              nameC={
                categories.length && indexChild !== -1 && indexParent !== -1
                  ? categories[indexParent]?.listCategoryChild?.length
                    ? categories[indexParent].listCategoryChild?.[indexChild]
                        .name
                    : ""
                  : ""
              }
            />
          )}
          <MenuListData data={products?.list || []} />
          {totalPages > 1 ? (
            <div className="flex lg:justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                limit={windownSizeWidth > withResponsive._1024 ? 5 : 4}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

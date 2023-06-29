import { ICMenuBar } from "@assets/icons/ICMenuBar";
import { Colors } from "@constants/color";
import React, { memo, useState } from "react";
import { MenuBodyFilterByCategory } from "./MenuBodyFilterByCategory";
import clsx from "clsx";
import { useClickOutItem } from "@hooks/useClickOutItem";
import type { ICategory } from "@typeRules/category";
import { ICFilterProduct } from "@assets/icons/ICFilterProduct";
import { MenuBodySortMobile } from "./MenuBodySortMobile";

type Props = {
  categories: ICategory[];
  handleChangeCategoryParent: (id: number) => void;
  handleSelectCategorySub: (id: number, idParent: number) => void;
  indexChild: number;
  indexParent: number;
  nameP?: string;
  nameC?: string;
  handleClear: () => void;
  onChangeSort: (id: string) => void;
};

export const MenuBodyFilterMobile = ({
  categories,
  handleChangeCategoryParent,
  handleSelectCategorySub,
  indexChild,
  indexParent,
  nameC,
  nameP,
  handleClear,
  onChangeSort,
}: Props) => {

  return (
    <div className="flex justify-between items-baseline ">
      <h3
        onClick={handleClear}
        className="title-64 text-secondary w-fit cursor-pointer"
      >{`${nameP} ${nameC ? " - " + nameC : ""}`}</h3>
      <div className="flex items-center gap-x-[24px]">
        <ProductSort onChangeSort={onChangeSort} />
        <CategoryFilter
          indexChild={indexChild}
          indexParent={indexParent}
          handleClear={handleClear}
          categories={categories}
          handleChangeCategoryParent={handleChangeCategoryParent}
          handleSelectCategorySub={handleSelectCategorySub}
        />
      </div>
    </div>
  );
};

const ProductSort = memo(
  ({ onChangeSort }: { onChangeSort: (id: string) => void }) => {
    const sortRef = useClickOutItem();
    return (
      <div ref={sortRef.ref} className="flex relative items-end">
        <button onClick={sortRef.handleToggleItem}>
          <ICFilterProduct />
        </button>
        <div
          className={clsx(
            "absolute w-[336px] max-w-[90vw] p-[16px] pb-0 top-[calc(100%_+_15px)] right-[-50px] bg-white z-[8] menu-body-sort",
            {
              "scale-menu-sort": sortRef.isShow,
            }
          )}
        >
          <MenuBodySortMobile
            onClose={sortRef.handleToggleItem}
            onChange={onChangeSort}
          />
        </div>
      </div>
    );
  }
);

type PropsCategoryFilter = {
  categories: ICategory[];
  handleChangeCategoryParent: (id: number) => void;
  handleSelectCategorySub: (id: number, idParent: number) => void;
  indexChild: number;
  indexParent: number;
  nameP?: string;
  nameC?: string;
  handleClear: () => void;
};

const CategoryFilter = memo(
  ({
    categories,
    handleChangeCategoryParent,
    handleSelectCategorySub,
    indexChild,
    indexParent,
    handleClear,
  }: PropsCategoryFilter) => {
    const { ref, isShow, handleToggleItem } = useClickOutItem();
    return (
      <div ref={ref} className="relative flex items-baseline">
        <button onClick={handleToggleItem}>
          <ICMenuBar color={Colors.secondary} />
        </button>
        <div
          className={clsx(
            "absolute w-[350px] p-[16px] pb-0 top-[calc(100%_+_15px)] right-[8px] bg-white z-[8] menu-body-category",
            {
              "scale-menu": isShow,
            }
          )}
        >
          <MenuBodyFilterByCategory
            handleClear={handleClear}
            categories={categories}
            handleChangeCategoryParent={handleChangeCategoryParent}
            handleSelectCategorySub={handleSelectCategorySub}
            indexChild={indexChild}
            indexParent={indexParent}
            onHidden={handleToggleItem}
          />
        </div>
      </div>
    );
  }
);

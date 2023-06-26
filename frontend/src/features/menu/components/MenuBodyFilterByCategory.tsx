import React, { memo } from "react";
import { MenuBodyFilterItem } from "./MenuBodyFilterItem";
import { ICDeleteSibar } from "@assets/icons/ICDeleteSibar";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { useCategoryFilter } from "@features/dashboard/product/components/useCategoryFilter";

type Props = {
  onHidden?: () => void;
  onChangeCategory: (id: number) => void;
};

export const MenuBodyFilterByCategory = memo(
  ({ onHidden, onChangeCategory }: Props) => {
    const {
      handleChangeCategoryParent,
      handleSelectCategorySub,
      categories,
      indexChild,
      indexParent,
    } = useCategoryFilter({ onChange: onChangeCategory, isAll: true });

    return (
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-_16 font-semibold lg:font-normal lg:title-32 text-secondary lg:mb-[32px]">
            Thực đơn
          </h3>
          {windownSizeWidth <= withResponsive._1024 ? (
            <button onClick={onHidden}>
              <ICDeleteSibar />
            </button>
          ) : null}
        </div>
        {categories.map((item, index) => {
          return (
            <MenuBodyFilterItem
              onChangeChild={handleSelectCategorySub}
              onChangeParent={handleChangeCategoryParent}
              key={item.id}
              data={item}
              isActive={index === indexParent}
              indexChild={indexChild}
            />
          );
        })}
      </div>
    );
  }
);

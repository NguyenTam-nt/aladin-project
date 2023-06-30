import React, { memo } from "react";
import { MenuBodyFilterItem } from "./MenuBodyFilterItem";
import { ICDeleteSibar } from "@assets/icons/ICDeleteSibar";
import { windownSizeWidth, withResponsive } from "@constants/index";
import type { ICategory } from "@typeRules/category";
import { useTranslation } from "react-i18next";

type Props = {
  onHidden?: () => void;
  categories: ICategory[]
  handleChangeCategoryParent : (id:number) => void,
  handleSelectCategorySub:  (id:number, idParent:number) => void,
  indexChild: number,
  indexParent: number,
  handleClear: () => void

};

export const MenuBodyFilterByCategory = memo(
  ({ onHidden, categories, handleChangeCategoryParent, handleSelectCategorySub, indexChild, indexParent, handleClear }: Props) => {
    const {t} = useTranslation()
    return (
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-_16 font-semibold lg:font-normal lg:title-32 text-secondary w-fit lg:mb-[32px] cursor-pointer" onClick={handleClear}>
            {t("menu.menu")}
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
             onClose={onHidden}
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

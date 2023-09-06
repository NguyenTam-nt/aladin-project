import { ICClear } from "@assets/iconElements/ICClear";
import PlustIcon from "@assets/iconElements/PlustIcon";
import { PrevIcon } from "@assets/icons/plust-mark/PrevIcon";
import useI18n from "@hooks/useI18n";
import { CategoryType } from "@services/Types/category";
import { colors } from "@utility/colors";
import clsx from "clsx";
import React, { memo, useState } from "react";

interface Props {
  itemCategory: CategoryType;
  categoryCheck: { id?: number | null; idSub?: number | null };
  handleClick: (id: number, subId?: number) => void;
}
const ChoseCategory = memo(
  ({ itemCategory, categoryCheck, handleClick }: Props) => {
    const { isVn } = useI18n();
    const [isShow, setShow] = useState<boolean>(false);
    return (
      <div>
        <div
          onClick={() => {
            setShow(!isShow);
            handleClick(
              itemCategory.id!,
              itemCategory.subCategoryList[0]
                ? itemCategory.subCategoryList[0].id
                : undefined
            );
          }}
          className={clsx("py-2 px-5 flex items-center gap-2")}
        >
          <span className="rotate-45 min-w-[20px] flex  justify-center">
            {itemCategory.subCategoryList.length > 0 && (
              <ICClear width={10} height={10} />
            )}
          </span>
          <p
            className={clsx("", {
              "text-main": categoryCheck.id == itemCategory.id,
            })}
          >
            {isVn ? itemCategory.categoryNameVn : itemCategory.categoryNameKr}
          </p>
        </div>
        <div
          style={{
            height: isShow ? 36 * itemCategory.subCategoryList.length : 0,
          }}
          className={clsx("pl-10 overflow-hidden ease-in duration-200")}
        >
          {itemCategory.subCategoryList.map((sub, indexSub) => {
            return (
              <div
                key={indexSub}
                onClick={() => handleClick(itemCategory.id!, sub.id)}
                className={clsx("py-2 px-5 flex items-center", {
                  "text-main": categoryCheck.idSub == sub.id,
                })}
              >
                {isVn ? sub.subCategoryNameVn : sub.subCategoryNameKr}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default ChoseCategory;

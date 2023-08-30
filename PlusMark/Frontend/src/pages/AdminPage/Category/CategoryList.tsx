import EditIcon from "@assets/iconElements/EditIcon";
import { ICDeleteTrashLight } from "@assets/iconElements/ICDeleteTrashLight";
import useI18n from "@hooks/useI18n";
import { CategoryType } from "@services/Types/category";
import React, { memo } from "react";

interface Props {
  category: CategoryType[];
  onDelete: (id: number) => void;
}
const CategoryList = memo(({ category, onDelete }: Props) => {
  const { t, isVn } = useI18n();
  return (
    <div>
      <table className="w-full text-black-bl01">
        <thead>
          <tr>
            <th className="text-left flex items-center pb-[34px]">
              <input
                type="checkbox"
                // onChange={choseAllList}
                // checked={listIdDelete.length == listItem.length}
              />
            </th>
            <th className="text-left pb-[34px]">
              {t("text.table.category_name")}
            </th>
            <th className="text-left pb-[34px]">
              {t("text.table.detail_category")}
            </th>
            <th className="text-right pb-[34px]">{t("text.table.func")}</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, index) => {
            return (
              <tr key={item.id} className="py-4 border-t border-t-borderGray">
                <td className="py-4">
                  <input
                    // checked={listIdDelete.includes(item.id)}
                    // onChange={() => handleInputDelete(item.id)}
                    // style={{ border: "1px solid red" }}
                    type="checkbox"
                  />
                </td>
                <td className="py-4">
                  {isVn ? item.categoryNameVn : item.categoryNameKr}
                </td>
                <td className="py-4">
                  {item.subCategoryList.map((sub, index) => {
                    return isVn ? sub.subCategoryNameVn : sub.subCategoryNameKr;
                  })}
                </td>
                <td className="text-right py-4">
                  <div className="flex items-center justify-end gap-2 cursor-pointer">
                    <div
                    // onClick={() => handleShowEdit(item)}
                    >
                      <EditIcon />
                    </div>
                    <div onClick={() => onDelete(item.id!)}>
                      <ICDeleteTrashLight />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default CategoryList;

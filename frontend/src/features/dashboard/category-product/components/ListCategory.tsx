import { Checkbox } from "@features/dashboard/components/Checkbox";
import React, { MutableRefObject, Ref, RefObject } from "react";
import { useHandleCheckbox } from "../useHandleCheckbox";
import { useTranslation } from "react-i18next";
import { ICEdit } from "@assets/icons/ICEdit";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { useModalContext } from "@contexts/hooks/modal";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import { CategoryProductHandler } from "./CategoryProductHandler";

export const ListCategory = () => {
  const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem } =
    useHandleCheckbox([1, 2, 3, 4, 5, 6]);
  const { t } = useTranslation();

  const { setElementModal } = useModalContext();
  const handleShowModal = () => {
    setElementModal(<CategoryProductHandler type="EDIT" />);
  };

  const handleDeleteModal = () => {
    setElementModal(<DiglogComfirmDelete message="category.message_delete" />);
  };
  return (
    <>
      <div className="border-b border-br_E9ECEF pb-[16px] grid grid-cols-[25px_25%_1fr_20%] gap-x-[16px] [&>p]:text-_16  [&>p]:font-semibold [&>P]:text-text_primary ">
        <div>
          <Checkbox onChange={handleCheckAll} ref={refCheckboxAll} />
        </div>
        <p>{t("category.form.name_parent")}</p>
        <p>{t("category.form.name_child")}</p>
        <p className="flex justify-end">{t("category.form.fuc")}</p>
      </div>
      {[1, 2, 3, 4, 5, 6].map((_, index) => {
        return (
          <div
            key={index}
            className="border-b border-br_E9ECEF py-[16px] grid grid-cols-[25px_25%_1fr_20%] gap-x-[16px] [&>p]:text-_14 [&>P]:text-text_primary "
          >
            <div>
              <Checkbox
                onChange={(event) => handleCheckedItem(event, index)}
                ref={(element: HTMLInputElement) => {
                  refCheckboxList.current[index] = element;
                }}
              />
            </div>
            <p>Lẩu</p>
            <p>Lẩu 1 ngăn, Lẩu 2 ngăn, Lẩu 4 ngăn</p>
            <div className="flex justify-end gap-x-[16px]">
              <button onClick={handleShowModal}>
                <ICEdit />
              </button>
              <button onClick={handleDeleteModal}>
                <ICDeleteTrashLight />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

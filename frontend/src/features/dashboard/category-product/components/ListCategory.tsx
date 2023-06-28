import { Checkbox } from "@features/dashboard/components/Checkbox";
import React, { MutableRefObject, Ref, RefObject, memo } from "react";
import { useHandleCheckbox } from "../useHandleCheckbox";
import { useTranslation } from "react-i18next";
import { ICEdit } from "@assets/icons/ICEdit";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { useModalContext } from "@contexts/hooks/modal";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import { CategoryProductHandler } from "./CategoryProductHandler";
import type { ICategory } from "@typeRules/category";

import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "@features/dashboard/components/Loading";

type Props = {
  data: ICategory[];
  onDelete: (id: number) => void;
  total: number;
  fechData: () => void;
  loading: boolean;
  onEdit: (data: ICategory) => void;
};

export const ListCategory = memo(
  ({ data, onDelete, total, fechData, loading, onEdit }: Props) => {
    const { t } = useTranslation();

    const { setElementModal } = useModalContext();
    const handleShowModal = (item: ICategory) => {
      setElementModal(
        <CategoryProductHandler
          dataCategory={item}
          onSubmit={onEdit}
          type="EDIT"
        />
      );
    };

    const handleDeleteModal = (id: number) => {
      setElementModal(
        <DiglogComfirmDelete
          onClick={() => onDelete(id)}
          message="category.message_delete"
        />
      );
    };

    return (
      <>
        <div className="border-b border-br_E9ECEF pb-[16px] grid grid-cols-[25%_1fr_20%] gap-x-[16px] [&>p]:text-_16  [&>p]:font-semibold [&>P]:text-text_primary ">
          <p>{t("category.form.name_parent")}</p>
          <p>{t("category.form.name_child")}</p>
          <p className="flex justify-end">{t("category.form.fuc")}</p>
        </div>
        <InfiniteScroll
          hasMore
          loader={
            loading ? (
              <div className="flex justify-center">
                <Loading />
              </div>
            ) : (
              <></>
            )
          }
          next={fechData}
          dataLength={data.length}
        >
          {data.length ? (
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-b border-br_E9ECEF py-[16px] grid grid-cols-[25%_1fr_20%] gap-x-[16px] [&>p]:text-_14 [&>P]:text-text_primary "
                >
                  <p>{item.name}</p>
                  <p>
                    {item.listCategoryChild?.length ?
                      item.listCategoryChild.map((i) => i.name).join(", ") : ""}
                  </p>
                  <div className="flex justify-end gap-x-[16px]">
                    <button onClick={() => handleShowModal(item)}>
                      <ICEdit />
                    </button>
                    <button onClick={() => handleDeleteModal(Number(item.id))}>
                      <ICDeleteTrashLight />
                    </button>
                  </div>
                </div>
              );
            })
          ) : !loading ? (
            <p className="text-center py-[50px]">Không có dữ liệu.</p>
          ) : null}
        </InfiniteScroll>
      </>
    );
  }
);

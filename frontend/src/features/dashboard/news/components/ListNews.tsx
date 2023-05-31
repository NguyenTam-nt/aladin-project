import { ICClear } from "@assets/icons/ICClear";
import { ICEdit } from "@assets/icons/ICEdit";
import { Checkbox } from "@components/Checkbox";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import { LoadingData } from "@components/LoadingData";
import { prefixRootRoute } from "@configs/index";
import { pathNewsHandle } from "@constants/contain";
import { pathsAdmin } from "@constants/routerAdmin";
import { ModalContext } from "@contexts/ModalContext";
import { TranslateContext } from "@contexts/Translation";
import Pagination from "@features/dashboard/components/Pagination";
import type {  INews } from "@typeRules/news";
import React, { ChangeEvent, MutableRefObject, Ref, memo, useContext } from "react";
import { Link } from "react-router-dom";

type Props = {
  data: INews[];
  total: number;
  currentPage: any;
  setCurrentPage: any;
  onDeleteItem: (id: number[]) => void;
  refCheckboxAll: Ref<HTMLInputElement>;
  refCheckboxList: MutableRefObject<HTMLInputElement[]>;
  onChangeAll: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeItem: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  listChecked: number[];
  loading: boolean;
};

export const ListNews = memo(({
  data,
  total,
  currentPage,
  setCurrentPage,
  refCheckboxAll,
  refCheckboxList,
  onChangeAll,
  onChangeItem,
  onDeleteItem,
  listChecked,
  loading
}: Props) => {
  const { t, isVn } = useContext(TranslateContext);
  const { setElementModal } = useContext(ModalContext);

  const handleShowModal = (id: number) => {
    setElementModal(
      <DialogConfirmDelete
        onClick={() => onDeleteItem([id])}
        message={t("admin._notice._delete_news")}
      />
    );
  };

  return (
    <div className="mt-[40px]">
      <div className=" items-center gap-x-[24px] grid grid-cols-[30px_30px_1fr_1fr_12%_12%_12%] font-semibold text-_18 text-text_primary pb-[16px] border-b border-br_E9ECEF">
        <button>
          <Checkbox onChange={onChangeAll} ref={refCheckboxAll} />
        </button>
        <div>{t("admin.news._table._no")}</div>
        <div>{t("admin.news._table._title")}</div>
        <div>{t("admin.news._table._content")}</div>
        <div>{t("admin.news._table._category")}</div>
        <div>{t("admin.news._table._created_at")}</div>
        <div className="flex justify-end">{t("admin.news._table._func")}</div>
      </div>

      {
        loading ? (
          <div className="flex justify-center items-center"><LoadingData /></div>
        ) : (
      data.map((item, index) => {
        return (
          <div
            key={item.id}
            className=" items-center gap-x-[24px] grid grid-cols-[30px_30px_1fr_1fr_12%_12%_12%] font-semibold text-_14 text-text_primary py-[16px] border-b border-br_E9ECEF"
          >
            <button>
              <Checkbox
                checked={listChecked.some((_item) => _item === item.id)}
                onChange={(event) => onChangeItem(event, index)}
                ref={(ref: HTMLInputElement) =>
                  (refCheckboxList.current[index] = ref)
                }
              />
            </button>
            <div>{index + 1}</div>
            <div className=" line-clamp-2">
              {isVn ? item.title : item.titleKo}
            </div>
            <div className="line-clamp-2">
              {isVn ? item.description : item.descriptionKo}
            </div>
            <div>
              {isVn ? item?.newsCategory?.name : item?.newsCategory?.nameKo}
            </div>
            <div>{new Date(item.createdDate ?? "").toLocaleDateString()}</div>
            <div className="flex justify-end items-center gap-[12px]">
              {/* <InputSwitch /> */}
              <Link
                to={`${prefixRootRoute.admin}/${pathsAdmin.news.prefix}/${pathNewsHandle.edit}?slug=${item.id}`}
              >
                <ICEdit />
              </Link>
              <button onClick={() => handleShowModal(Number(item.id))}>
                <ICClear />
              </button>
            </div>
          </div>
        );
      }))}

      <div className="flex justify-end mt-[40px]">
        <Pagination
          currenPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={total}
        />
      </div>
    </div>
  );
})

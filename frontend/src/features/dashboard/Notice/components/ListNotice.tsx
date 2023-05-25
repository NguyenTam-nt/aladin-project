import { ICClear } from "@assets/icons/ICClear";
import { ICEdit } from "@assets/icons/ICEdit";
import { Checkbox } from "@components/Checkbox";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import { InputSwitch } from "@components/InputSwitch";
import { prefixRootRoute } from "@configs/index";
import {  pathNoticeHandle } from "@constants/contain";
import { pathsAdmin } from "@constants/routerAdmin";
import { ModalContext } from "@contexts/ModalContext";
import { TranslateContext } from "@contexts/Translation";
import Pagination from "@features/dashboard/components/Pagination";
import { useHandleCheckbox } from "@features/dashboard/hooks/useHandleCheckbox";
import { usePagination } from "@features/dashboard/hooks/usePagination";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

export const ListNotice = () => {
  const { t } = useContext(TranslateContext);
  const {setElementModal} = useContext(ModalContext)
  const { currenPage, setCurrentPage } = usePagination();
  const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem } =
    useHandleCheckbox([1, 2, 3, 4, 5, 6]);
    const handleShowModal = () => {
      setElementModal(<DialogConfirmDelete message={t("admin._notice._delete_notice")} />)
    }
  return (
    <div className="mt-[40px]">
      <div className=" items-center gap-x-[24px] grid grid-cols-[30px_30px_1fr_1fr_12%_12%_12%] font-semibold text-_18 text-text_primary pb-[16px] border-b border-br_E9ECEF">
        <button>
          <Checkbox
            onChange={handleCheckAll}
            ref={refCheckboxAll}
          />
        </button>
        <div>{t("admin.news._table._no")}</div>
        <div>{t("admin.news._table._title")}</div>
        <div>{t("admin.news._table._content")}</div>
        <div>{t("admin.news._table._category")}</div>
        <div>{t("admin.news._table._created_at")}</div>
        <div className="flex justify-end">{t("admin.news._table._func")}</div>
      </div>
      {[1, 2, 3, 4, 5, 6].map((_, index) => {
        return (
          <div
            key={index}
            className=" items-center gap-x-[24px] grid grid-cols-[30px_30px_1fr_1fr_12%_12%_12%] font-semibold text-_14 text-text_primary py-[16px] border-b border-br_E9ECEF"
          >
            <button>
              <Checkbox
                onChange={(event) => handleCheckedItem(event, index)}
                ref={(ref: HTMLInputElement) =>
                  (refCheckboxList.current[index] = ref)
                }
              />
            </button>
            <div>{index + 1}</div>
            <div className=" line-clamp-2">
              Neque in euismod mattis ullamcorper sapien vel.
            </div>
            <div className="line-clamp-2">
              Neque in euismod mattis ullamcorper sapien vel.
            </div>
            <div>Nghiên cứu khoa học</div>
            <div>24/12/2023</div>
            <div className="flex justify-end items-center gap-[12px]">
              <InputSwitch />
              <Link
                to={`${prefixRootRoute.admin}/${pathsAdmin.notice.prefix}/${pathNoticeHandle.edit}?slug=${index}`}
              >
                <ICEdit />
              </Link>
              <button onClick={handleShowModal}>
                <ICClear />
              </button>
            </div>
          </div>
        );
      })}

      <div className="flex justify-end mt-[40px]">
        <Pagination
          currenPage={currenPage}
          setCurrentPage={setCurrentPage}
          total={10}
        />
      </div>
    </div>
  );
};

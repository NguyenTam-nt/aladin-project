import { ICClear } from "@assets/icons/ICClear";
import { ICEdit } from "@assets/icons/ICEdit";
import { Checkbox } from "@components/Checkbox";
import { InputSwitch } from "@components/InputSwitch";
import { TranslateContext } from "@contexts/Translation";
import Pagination from "@features/dashboard/components/Pagination";
import { useHandleCheckbox } from "@features/dashboard/hooks/useHandleCheckbox";
import { usePagination } from "@features/dashboard/hooks/usePagination";
import React, { useContext } from "react";

export const ListNews = () => {
  const { t } = useContext(TranslateContext);
  const {currenPage, setCurrentPage} = usePagination()
  const {refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem} = useHandleCheckbox([1, 2, 3, 4, 5, 6])
  return (
    <div className="mt-[40px]">
      <div className=" items-center gap-x-[24px] grid grid-cols-[30px_30px_1fr_1fr_12%_12%_12%] font-semibold text-_18 text-text_primary pb-[16px] border-b border-br_E9ECEF">
        <button>
          <Checkbox id="news_check" onChange={handleCheckAll} ref={refCheckboxAll} />
        </button>
        <div>{t("admin.news._table._no")}</div>
        <div>{t("admin.news._table._title")}</div>
        <div>{t("admin.news._table._content")}</div>
        <div>{t("admin.news._table._category")}</div>
        <div>{t("admin.news._table._created_at")}</div>
        <div className="flex justify-end">{t("admin.news._table._func")}</div>
      </div>
      {[1, 2, 3, 4, 5, 6].map((item, index) => {
        return (
            <div key={index} className=" items-center gap-x-[24px] grid grid-cols-[30px_30px_1fr_1fr_12%_12%_12%] font-semibold text-_18 text-text_primary py-[16px] border-b border-br_E9ECEF">
            <button>
              <Checkbox onChange={(event) => handleCheckedItem(event, index) } id={`news_${item}_${index}`} ref={(ref:HTMLInputElement) => refCheckboxList.current[index] = ref} />
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
              <button>
                <ICEdit />
              </button>
              <button>
                <ICClear />
              </button>
            </div>
          </div>
            
        );
      })}

      <div className="flex justify-end mt-[40px]">
        <Pagination currenPage={currenPage} setCurrentPage={setCurrentPage} total={10} />
      </div>
    </div>
  );
};
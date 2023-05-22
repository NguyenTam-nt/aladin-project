import React, { memo, useContext, useState } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { TranslateContext } from "@contexts/Translation";
import { ModalContext } from "@contexts/ModalContext";
import Pagination from "../components/Pagination";
import { Button } from "@components/Button";
import { ICPlus } from "@assets/icons/ICPlus";
import { InputAdmin } from "../components/InputAdmin";

export const Account = () => {
  const [currenPage, setCurrentPage] = useState(1);
  const { setElementModal } = useContext(ModalContext);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="">
      <HeaderAdmin title="account._title" />
      <div className="flex items-center h-[48px]">
        <InputAdmin />
        <Button
          color="primary"
          text="account._btn_create"
          className="bg-secondary  ml-[24px] !w-[200px] h-[48px]"
          imageLeft={<ICPlus />}
        />
      </div>
      <AccountTable />
      <div className="mt-[120px] flex justify-end">
        <Pagination
          currenPage={currenPage}
          setCurrentPage={setCurrentPage}
          total={10}
        />
      </div>
    </div>
  );
};

const AccountTable = memo(() => {
  const { t } = useContext(TranslateContext);
  return (
    <>
      <div className="pb-[14px] grid grid-cols-5 mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
        <div>{t("account._form._name")}</div>
        <div>{t("account._form._role")}</div>
        <div>{t("account._form._create_day")}</div>
        <div>{t("account._form._expired_day")}</div>
        <div className="flex justify-end">{t("account._form._function")}</div>
      </div>
      <div className="py-[16px] grid grid-cols-5 mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">

      </div>
    </>
  );
});

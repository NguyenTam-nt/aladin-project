import React, { memo, useContext, useRef, useState } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { TranslateContext } from "@contexts/Translation";
// import { ModalContext } from "@contexts/ModalContext";
import Pagination from "../components/Pagination";
import { Button } from "@components/Button";
import { ICPlus } from "@assets/icons/ICPlus";
import { InputAdmin } from "../components/InputAdmin";
import { ICDatePicker } from "@assets/icons/ICDatePicker";
import { ICClear } from "@assets/icons/ICClear";
import { ModalContext } from "@contexts/ModalContext";
import { ModalCreate } from "./components/ModalCreate";
import DialogConfirmDelete from "@components/DialogConfirmDelete";

export const Account = () => {
  const [currenPage, setCurrentPage] = useState(1);
  const { setElementModal } = useContext(ModalContext);
  // const [searchValue, setSearchValue] = useState("");

  const handleShowModal = () => {
    setElementModal(<ModalCreate />)
  }

  return (
    <div className="px-[24px]">
      <HeaderAdmin title="account._title" />
      <div className="flex items-center h-[48px]">
        <InputAdmin />
        <Button
        onClick={handleShowModal}
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
     {
      [1, 2, 3].map((_, index) => {
        return <AccountTableItem key={index} />
      })
     }
    </>
  );
});


const AccountTableItem = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const {t} = useContext(TranslateContext)
  const {setElementModal} = useContext(ModalContext)
  const handlShowPicker = () => {
    refInput.current?.showPicker();
  };
  const handleShowModal = () => {
    setElementModal(<DialogConfirmDelete message={t("admin._notice._delete_user", {name: "Bùi Ngự"})} />)
  }
  return (
    <div className="py-[16px] grid grid-cols-5 text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
    <div className="flex items-center gap-x-2">
      <div>
        <img
          src="https://s3-alpha-sig.figma.com/img/eebf/c417/4d4828bf76f6e54e0b85f4bae6f2fcc1?Expires=1685318400&Signature=kytYT5eiYqJxzvh5vfEObtDd72oyufGbkSasqCLQtxxZXmut4XwNWYWyqp43gAymDXDDw1tVZ3ylaLkkWDDMB54vCzGVsAGolubDGaerCu3VsXaW8Ypcxip24ybdx3NZzeh8IxYKI2fh2qS9RPUZzFTK87ptoXRa5Y31FYDcug9iFLEqwqa-Zd74qb5OLh~PKRveP99ZR430RZTKEoPSrprIswNZIMbdfkKY8qQpyvDL40-qrp3H9GGsk7q3RBxvZEypztJy89qf4x7AajpBqLLq5OMQ2Z6R0PV3kQ4qCajYR97-54LBQcJZV00kPgYqW2uH0uAuibS7ivrYkb4SFg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt=""
          className="w-[48px] h-[48px] rounded-[50%] object-cover"
        />
      </div>
      <div>
        <p className="text-_14 font-semibold text-text_black">
          HCMUSSH - Admin
        </p>
        <p className="text-_12 font-medium text-text_565656">
          @hcmussh.admin
        </p>
      </div>
    </div>
    <div>
      <select
        id="default"
        defaultValue="Admin"
        className="bg-gray-50 border w-[172px] border-br_E9ECEF text-text_primary  text-_14 block p-2.5 "
      >
        <option>Admin</option>
      </select>
    </div>
    <div>
      <p className="text-_14 font-semibold text-text_black">01/07/2022</p>
      <p className="text-_12 font-medium text-text_565656">
        @hcmussh.admin
      </p>
    </div>
    <div>
      <div className="flex h-full w-[172px] px-[12px] items-center border border-br_E9ECEF">
        <input
          ref={refInput}
          type="date"
          className="text-sm h-full flex-1"
        />
        <button onClick={handlShowPicker}>
          <ICDatePicker />
        </button>
      </div>
    </div>
    <div className="flex justify-end">
      <button onClick={handleShowModal}>
        <ICClear />
      </button>
    </div>
  </div>
  )
}
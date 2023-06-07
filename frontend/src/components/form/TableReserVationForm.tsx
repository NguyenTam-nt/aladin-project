import TitleInput from "@components/TitleInput";
import TitleOfContent from "@components/TitleOfContent";
import React from "react";
import { useTranslation } from "react-i18next";

const TableReserVationForm = () => {
  const { t } = useTranslation();
  return (
    <div className="pb-36">
      <div className="h-auto radius-tl-br bg-white py-16 px-28">
        <TitleOfContent
          name="titleofcontent.tableReserVationForm"
          className="w-full text-center mb-4 "
        />
        <p className="text-2xl leading-9 text-center font-normal text-text_secondary">
          {t("form.timeOrder")}
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
            <div className="col-span-1">
              <TitleInput isRequired name="form.name" />
              <input
                type="text"
                className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border border-gray-200"
                placeholder={t("form.inputName") as string}
              />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired name="form.phoneNumber" />
              <input
                type="text"
                className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border border-gray-200"
                placeholder={t("form.inputPhoneNumber") as string}
              />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired name="form.email" />
              <input
                type="text"
                className="w-full px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border border-gray-200"
                placeholder={t("form.inputEmail") as string}
              />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired name="form.numberCustomers" />
              <input
                type="text"
                className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border border-gray-200"
                placeholder={t("form.inputNumberCustomers") as string}
              />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired name="form.day" />
              <input
                type="text"
                className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border border-gray-200"
                placeholder={t("form.choseDayOder") as string}
              />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired name="form.hour" />
              <input
                type="text"
                className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border border-gray-200"
                placeholder={t("form.choseHourOder") as string}
              />
            </div>
            <div className="col-span-2">
              <TitleInput isRequired name="form.place" />
              <input
                type="text"
                className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border border-gray-200"
                placeholder={t("form.inputPlace") as string}
              />
            </div>
            <div className="col-span-2">
              <TitleInput isRequired name="form.note" />
              <textarea
                rows={6}
                className="w-full resize-none px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border border-gray-200"
                placeholder={t("form.inputNote") as string}
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-9">
            <button className="radius-tl-br16 w-spc167 py-3 text-center text-sm leading-5 font-bold bg-primary text-white">
              đặt bàn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableReserVationForm;

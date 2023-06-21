import TitleInput from "@components/TitleInput";
import { Button } from "@features/dashboard/components/Button";
import { Input } from "@features/dashboard/components/Input";
import { Radio } from "@features/dashboard/components/Radio";
import { Textarea } from "@features/dashboard/components/Textarea";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
}
const ModalFeedbackReservation = ({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="w-[1144px] h-auto bg-white py-10 px-6">
      <h2 className="text-_32 font-bold text-text_primary uppercase text-center mb-10">
        {t("tableReservation.form.title")}
      </h2>
      <div className="">
        <h3 className="text-_20 font-bold text-text_primary text-left mb-3">
          {t("tableReservation.form.customer_title")}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <TitleInput isRequired={true} name={"form.name"} />
            <Input value={"Nguyễn Mạnh Cường"} />
          </div>
          <div className="col-span-1">
            <TitleInput isRequired={true} name={"form.phoneNumber"} />
            <Input value={"0912345678"} />
          </div>
          <div className="col-span-1">
            <TitleInput isRequired={true} name={"form.email"} />
            <Input value={"cuongnm@aladintech.co"} />
          </div>
          <div className="col-span-1">
            <TitleInput isRequired={false} name={"form.numberCustomers"} />
            <Input value={5} />
          </div>
          <div className="col-span-1">
            <TitleInput isRequired={false} name={"form.day"} />
            <input
              defaultValue={new Date().toLocaleString()}
              type="date"
              className="h-[48px] placeholder:text-text_A1A0A3 placeholder:text-_14 w-full flex items-center py-[13px] px-[16px] border-[1px] border-solid border-text_A1A0A3 focus-within:!border-TrueBlue_500 "
              //   onChange={handleChangeTime}
            />
          </div>
          <div className="col-span-1">
            <TitleInput isRequired={false} name={"form.hour"} />
            <input
              type="time"
              className="h-[48px] placeholder:text-text_A1A0A3 placeholder:text-_14 w-full flex items-center py-[13px] px-[16px] border-[1px] border-solid border-text_A1A0A3 focus-within:!border-TrueBlue_500 "
              //   onChange={handleChangeTime}
            />
          </div>

          <div className="col-span-2">
            <TitleInput isRequired={true} name={"form.place"} />

            <Input value={"cơ sở 1 - nguyễn tuân"} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-_20 font-bold text-text_primary text-left mb-6">
          {t("adminContact.form.response_title")}
        </h3>

        <div className="">
          <TitleInput isRequired={true} name={"form.note"} />
          <Textarea />
        </div>
      </div>
      <div>
        <div className="mt-2">
          <TitleInput isRequired={true} name={"adminContact.form.response"} />
          <div className="flex gap-6">
            <div className="flex items-center">
              <Radio
                id="tableReservation.record_reques_order_table"
                name="active-home"
              />
              <label
                htmlFor="tableReservation.record_reques_order_table"
                className=" text-GreyPrimary text-_14 ml-[6px]"
              >
                {t("tableReservation.record_reques_order_table")}
              </label>
            </div>
            <div className="flex items-center">
              <Radio
                id="tableReservation.declinded_reques_order_table"
                name="active-home"
              />
              <label
                htmlFor="tableReservation.declinded_reques_order_table"
                className=" text-GreyPrimary text-_14 ml-[6px]"
              >
                {t("tableReservation.declinded_reques_order_table")}
              </label>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <TitleInput
            isRequired={true}
            name={"tableReservation.form.reason_for_refusa"}
          />
          <Input value={"đã hết bàn"} />
        </div>
      </div>
      {data && (
        <div className="flex justify-center items-center mt-[24px]">
          <Button
            type="button"
            // onClick={hideModal}
            text="button._cancel"
            color="empty"
            className="!w-[120px] border border-TrueBlue_500 mr-[24px]"
          />
          <Button
            type="submit"
            onClick={() => "onSubmit?.()"}
            text={true ? "button._save" : "button._save"}
            color="primary"
            className="!w-[120px]"
          />
        </div>
      )}
    </div>
  );
};

export default ModalFeedbackReservation;

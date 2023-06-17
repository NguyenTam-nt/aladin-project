import TitleInput from "@components/TitleInput";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { Textarea } from "@features/dashboard/components/Textarea";
import React from "react";
import { useTranslation } from "react-i18next";

export const ReplyModal = () => {
    const {hideModal} = useModalContext()
    const {t} = useTranslation()
  return (
    <div className="w-[800px] bg-white py-[40px] px-[24px]">
      <h3 className="text-_20 text-center mb-[40px] font-bold  text-GreyPrimary">
       {t("adminComment.modal.title")}
      </h3>
      <div className=" grid grid-cols-1 gap-y-4">
        <div className="flex items-baseline gap-x-6">
          <TitleInput name="adminComment.modal.position" isRequired={false} />
          <span className="text-_14 text-GreyPrimary">Admin</span>
        </div>
        <div>
          <TitleInput name="adminComment.modal.content" />
          <Textarea className="h-[192px]" placeholder="adminComment.modal.content_placeholder" />
        </div>
      </div>
      <div className="flex justify-center items-center  mt-[40px]">
        <Button
          type="button"
          onClick={hideModal}
          text="button._cancel"
          color="empty"
          className="!w-[120px] mr-[24px]"
        />
        <Button
          type="submit"
          // onClick={() => onSubmit?.()}
          text="button._send"
          color="primary"
          className="!w-[120px]"
        />
      </div>
    </div>
  );
};

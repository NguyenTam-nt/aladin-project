import { Input } from "@components/Input";
import { InputSwitch } from "@components/InputSwitch";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import React from "react";

export const ModalHandleMenu = () => {
  return (
    <div className="w-[1144px] bg-white py-[40px] px-[24px]">
      <TitleForm title="admin._header._form._title_edit" />
      <div className="grid grid-cols-1 gap-y-[24px]">
        <div>
          <TitleInput forId="" name="admin._header._form._name" />
          <Input />
        </div>
        <div>
          <TitleInput forId="" name="admin._header._form._category" />
          <div className="w-full flex items-center gap-x-[24px]">
            <div className="flex-1">
              <Input />
            </div>
            <InputSwitch />
          </div>
        </div>
        <GroupButtonAdmin onSubmit={() => {}} isAdd={false} />
      </div>
    </div>
  );
};

import { Input } from "@components/Input";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import React from "react";

enum ImageForm {
  name = "name",
  describe ="describe"
}

export const ModalCreate = () => {
 
  return (
    <div className="w-[800px] bg-white py-[40px] px-[24px]">
      <TitleForm title="image._form_create._title" />
      <div >
        <div>
          <TitleInput
            forId={ImageForm.name}
            name="image._form_create._name._name"
          />
          <Input
            id={ImageForm.name}
            placeholder="image._form_create._name._placeholder"
            className="h-[44px]"
          />
        </div>
        <div>
          <div className="mt-[18px]">
            <TitleInput
              forId={ImageForm.describe}
              name="image._form_create._describe._name"
            />
          </div>
          <Input
            id={ImageForm.describe}
            placeholder="image._form_create._describe._placeholder"
            className="h-[44px]"
          />
        </div>
        <div className="flex justify-center">
        <div className="col-span-2 mt-[40px] w-[264px]">
          <GroupButtonAdmin onSubmit={() => {}} />
        </div>
        </div>
      </div>
    </div>
  );
};

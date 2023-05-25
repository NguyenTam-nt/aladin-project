import Editor from "@components/Editor";
import { Input } from "@components/Input";
// import { TranslateContext } from "@contexts/Translation";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import React from "react";
import { InputUploadFile } from "../components/InputUploadFIle";
import { ImagePreview } from "../components/ImagePreview";
import { useHandleImage } from "../hooks/useHandleImage";

enum AccoutnForm {
  name = "name",
  gender = "gender",
  year = "year",
  position = "position",
  phone = "phone",
  email = "email",
  username = "username",
  password = "password",
}

export const CreateSubject = () => {
  // const { t } = useContext(TranslateContext);

   const { preViewImage , handleChange} =  useHandleImage()
  return (
    <div className=" bg-white py-[40px] px-[24px]">
      <TitleForm title="subject_manage._form_create._title" />
      <div className="grid grid-cols-1 gap-[24px]">
    
        <div>
          <TitleInput
            forId={AccoutnForm.name}
            name="subject_manage._form_create._name._name"
          />
          <Input
            id={AccoutnForm.name}
            placeholder="subject_manage._form_create._name._placeholder"
            className="h-[44px]"
          />
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.year}
            name="subject_manage._form_create._describe._name"
          />
          <Input
            id={AccoutnForm.year}
            placeholder="subject_manage._form_create._describe._placeholder"
            className="h-[44px]"
          />
        </div>
      </div>
      <div className="mt-[24px]">
        <TitleInput
          forId={AccoutnForm.year}
          name="subject_manage._form_create._title_content._name"
        />
        <Input
          id={AccoutnForm.year}
          placeholder="subject_manage._form_create._title_content._placeholder"
          className="h-[44px]"
        />
      </div>
    

      <div className="mt-[16px]">
        <TitleInput name="admin._about._general._form._content" forId={""} />
        <Editor content={""} onChange={() => {}} />
      </div>
      <div className="mt-[24px]">
        <TitleInput name="common.update_image" forId={""} />
      </div>
      <div className="mt-[16px] flex h-[168px]">
        <div className="w-[648px]">
          <InputUploadFile onChange={handleChange} />
        </div>
        <div className="flex-1 ml-3">
          <ImagePreview url={preViewImage} />
        </div>
      </div>
      <div className=" col-span-2 mt-[40px]">
        <GroupButtonAdmin onSubmit={() => {}} />
      </div>
    </div>
  );
};

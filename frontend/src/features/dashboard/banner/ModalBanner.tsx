import React from "react";
import { TitleForm } from "../components/TitleForm";
import TitleInput from "../components/TitleInput";
import { Input } from "@components/Input";
import { InputUploadFile } from "../components/InputUploadFIle";
import { useHandleImage } from "../hooks/useHandleImage";
import { ImagePreview } from "../components/ImagePreview";
import { GroupButtonAdmin } from "../components/GroupButtonAdmin";

export const ModalBanner = () => {
    const {preViewImage, handleChange} = useHandleImage()
  return (
    <div className="w-[1144px] py-[40px] px-[24px] bg-white">
      <TitleForm title="admin._banner._form._title" />
      <div className="grid grid-cols-1 gap-y-[24px]">
        <div>
          <TitleInput forId="" name="admin._banner._form._name" />
          <Input placeholder="admin._banner._form._name_placeholder" />
        </div>
        <div>
        <TitleInput forId="" name="admin._banner._form._upload" />
        <div className="flex h-[168px] gap-x-[24px]">
            <div className="w-[424px] h-full">
                <InputUploadFile onChange={handleChange} />
            </div>
            <div className="flex-1 h-full">
                <ImagePreview url={preViewImage} />
            </div>
        </div>
        </div>
        <GroupButtonAdmin onSubmit={() => {}} />
      </div>
    </div>
  );
};

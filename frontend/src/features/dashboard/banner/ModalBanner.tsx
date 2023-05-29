import React, { useContext } from "react";
import { TitleForm } from "../components/TitleForm";
import TitleInput from "../components/TitleInput";
import { Input } from "@components/Input";
import { InputUploadFile } from "../components/InputUploadFIle";
import { useHandleImage } from "../hooks/useHandleImage";
import { ImagePreview } from "../components/ImagePreview";
import { GroupButtonAdmin } from "../components/GroupButtonAdmin";
import type { IBanner } from "@typeRules/banner";
import { uploadService } from "@services/uploadService";
import { bannerService } from "@services/banner";
import { PopUpContext } from "@contexts/PopupContext";
import { ModalContext } from "@contexts/ModalContext";

type Props = {
  data: IBanner;
  onSubmit: (data: IBanner) => void;
};

export const ModalBanner = ({ data, onSubmit }: Props) => {
  const { preViewImage, handleChange, file } = useHandleImage(data.link);
  const { showSuccess, showError } = useContext(PopUpContext);
  const { hideModal } = useContext(ModalContext);
  const handleSubmit = async () => {
    const formData = new FormData();
    let image = "";
    if (file) {
      formData.append("file", file);
      image = await uploadService.postImage(formData);
    }
    bannerService
      .putBanner({
        ...data,
        link: image ? image : data.link,
      })
      .then((data) => {
        onSubmit(data);
        showSuccess("message.success._success");
        hideModal();
      })
      .catch(() => {
        showError("message.error._error");
      });
  };
  return (
    <div className="w-[1144px] py-[40px] px-[24px] bg-white">
      <TitleForm title="admin._banner._form._title_edit" />
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
        <GroupButtonAdmin isAdd={false} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

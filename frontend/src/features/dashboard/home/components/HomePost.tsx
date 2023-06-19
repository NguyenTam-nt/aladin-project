import React, { memo } from "react";
import { TitleTopic } from "./TitleTopic";
import TitleInput from "@components/TitleInput";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "../useHandleImage";
import { GroupInputContent } from "@features/dashboard/components/GroupInputContent";
import clsx from "clsx";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { useTranslation } from "react-i18next";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { useModalContext } from "@contexts/hooks/modal";
import { DiglogMessage } from "@features/dashboard/components/DiglogMessage";

export const HomePost = () => {
  const { t } = useTranslation();
  const {setElementModal} = useModalContext()

  const handleShowModal = () => {
    setElementModal(<DiglogMessage message="Cập nhật  bài viết thành công!" />)
  }

  return (
    <div className="mt-[40px]">
      <div className="flex items-baseline">
        <TitleTopic name="adminHome.post.title" />
        <span className="text-_14 text-text_A1A0A3 italic ml-2">
          {t("adminHome.post.maxPost")}
        </span>
      </div>
      <HomePostItem />
      <GroupButtonAdmin onSubmit={handleShowModal} />
    </div>
  );
};

export const HomePostItem = memo(() => {
  const { preViewImage, handleChange, refInput, handleDelete } =
    useHandleImage();
  return (
    <div className="grid grid-cols-[288px_1fr] relative gap-x-[24px]">
      <div className="flex flex-col">
        <TitleInput isRequired={false} forId="" name="button._upload_image" />
        <div className="flex-1">
          <div className={clsx("h-full", { hidden: !!preViewImage.trim() })}>
            <InputUploadFile ref={refInput} onChange={handleChange} />
          </div>
          <div
            //   onClick={handleClickInput}
            className={clsx("h-full w-full", {
              hidden: !preViewImage.trim(),
            })}
          >
            <ImagePreview onDelete={handleDelete} url={preViewImage} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <GroupInputContent />
      </div>
      <button className=" absolute bottom-0 flex items-center justify-center right-[-64px] h-[190px] w-[40px] bg-bg_F1F1F1">
        <ICDeleteTrashLight />
      </button>
    </div>
  );
});

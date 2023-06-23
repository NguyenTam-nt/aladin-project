import TitleInput from "@components/TitleInput";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { TextError } from "@features/dashboard/components/TextError";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import React, { ChangeEvent, memo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  videoFile: {
    preViewImage: string,
    handleChange: (event:ChangeEvent<HTMLInputElement>) => void,
    handleDelete : () => void,
    file: File | undefined,
    handleMessageFile: () => void,
    message: string,
    // handlePaste,
    isVideo : boolean,
  }
}

export const ProductHandlerVideo = memo(({videoFile}:Props) => {

  const { t } = useTranslation();
  return (
    <div className="col-span-2 flex gap-[24px]">
      <div className="w-[288px]">
        <div className="flex items-baseline">
          <TitleInput name="adminProduct.form.upload_video_product" />{" "}
          <span className="text-_12 italic ml-2">
            {t("adminProduct.form.maxVideo")}
          </span>
        </div>
        <div className="w-[288px] flex gap-x-[24px] h-[190px]">
          <InputUploadFile
            elmentNotice={<ListNoticeVideo />}
            isVideos
            onChange={videoFile.handleChange}
          />
        </div>
        <TextError message={videoFile.message} />
      </div>
      {videoFile.preViewImage ? (
        <div className="flex-1">
          <TitleInput name="common.video_uploaded" />{" "}
          <div className="w-[288px] h-[190px]">
            <ImagePreview
              onDelete={videoFile.handleDelete}
              isVideos
              isVideoYotube={false}
              url={videoFile.preViewImage}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
});

const listNotice = ["Định dạnh MP4", "Thời lượng: 10s-60s", "Tối đa 20MB"];

const ListNoticeVideo = () => {
  return (
    <ul className=" list-disc ml-[24px]">
      {listNotice.map((item, index) => {
        return (
          <li key={index} className="text-_14 font-normal text-text_A1A0A3">
            {item}
          </li>
        );
      })}
    </ul>
  );
};
